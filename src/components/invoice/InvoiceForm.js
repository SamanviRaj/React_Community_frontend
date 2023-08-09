import React, { useEffect, useState, useRef } from 'react';
import apiClient from '../apiclient/apiClient';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

const InvoiceForm = () => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: generateInvoiceNumber(),
        clientName: '',
        currentDate: new Date().toISOString().split('T')[0],
        expenses: [],
        totalAmount: 0,
        discountAmount: 0,
    });


    useEffect(() => {
        calculateTotalAmount();
    }, [invoiceData.expenses, invoiceData.discountAmount]);


    function generateInvoiceNumber() {
        // Generate a random 4-digit number
        return Math.floor(1000 + Math.random() * 9000);
    }

    const handleDeleteExpense = (index) => {
        const newExpenses = [...invoiceData.expenses];
        newExpenses.splice(index, 1);
        setInvoiceData((prevData) => ({ ...prevData, expenses: newExpenses }));
    };

    const handleExpensesChange = (index, updatedExpense) => {
        const newExpenses = [...invoiceData.expenses];
        newExpenses[index] = updatedExpense;
        setInvoiceData((prevData) => ({ ...prevData, expenses: newExpenses }));
    };

    const calculateTotalAmount = () => {
        const totalAmountBeforeDiscount = invoiceData.expenses.reduce(
            (acc, expense) => acc + parseFloat(expense.amount || 0),
            0
        );
        const totalAmountAfterDiscount = totalAmountBeforeDiscount - invoiceData.discountAmount;
        setInvoiceData((prevData) => ({ ...prevData, totalAmount: totalAmountAfterDiscount }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDiscountChange = (e) => {
        const discountAmount = parseFloat(e.target.value);
        setInvoiceData((prevData) => ({ ...prevData, discountAmount }));
        calculateTotalAmount(); // Calculate total amount when discount changes
    }

    const handleSave = async () => {
        try {
            const formattedExpenses = invoiceData.expenses.map(expense => ({
                label: expense.label || '',
                amount: parseFloat(expense.amount || 0),
            }));

            const invoiceDataToSave = {
                invoiceNumber: invoiceData.invoiceNumber,
                clientName: invoiceData.clientName,
                currentDate: invoiceData.currentDate,
                expenses: formattedExpenses,
                totalAmount: invoiceData.totalAmount,
                discountAmount: invoiceData.discountAmount,
            };

            apiClient.post('/api/v1/invoice/create', invoiceDataToSave)
                .then(response => {
                    console.log('Invoice data saved:', response);
                })
                .catch(error => {
                    console.error('API Error:', error);
                });


            // Generate PDF and initiate download
            const pdfBlob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();

            console.log('PDF Blob:', pdfBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = `invoice.pdf`;
            downloadLink.click();
        } catch (error) {
            console.error('Error saving invoice data:', error);
            // Handle error
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Invoice Generation</h2>
            <div className="mb-4">
                <label htmlFor="invoiceNumber" className="block mb-1 font-semibold">Invoice Number</label>
                <input
                    type="text"
                    name="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={handleInputChange}
                    placeholder="Invoice Number"
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="clientName" className="block mb-1 font-semibold">Client Name</label>
                <input
                    type="text"
                    name="clientName"
                    value={invoiceData.clientName}
                    onChange={handleInputChange}
                    placeholder="Client Name"
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="currentDate" className="block mb-1 font-semibold">Current Date</label>
                <input
                    type="date"
                    id="currentDate"
                    name="currentDate"
                    value={invoiceData.currentDate}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                />
            </div>


            <div className="mb-4">
                <label htmlFor="expenses" className="block mb-1 font-semibold">Expenses</label>
                {invoiceData.expenses.map((expense, index) => (
                    <div key={index} className="flex">
                        <input
                            type="text"
                            placeholder={`Enter label for expense ${index + 1}`}
                            value={expense.label || ''}
                            onChange={(e) => handleExpensesChange(index, { ...expense, label: e.target.value })}
                            onBlur={calculateTotalAmount}
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="number"
                            placeholder={`Enter amount for expense ${index + 1}`}
                            value={expense.amount || ''}
                            onChange={(e) => handleExpensesChange(index, { ...expense, amount: e.target.value })}
                            onBlur={calculateTotalAmount}
                            className="border p-2 w-full mb-2"
                        />
                        <button
                            onClick={() => handleDeleteExpense(index)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => setInvoiceData((prevData) => ({ ...prevData, expenses: [...prevData.expenses, { label: '', amount: '' }] }))}
                    className="text-blue-500 hover:underline"
                >
                    Add Expense
                </button>
            </div>
            <div className="mb-4">
                <label htmlFor="discountAmount" className="block mb-1 font-semibold">Discount Amount</label>
                <input
                    type="number"
                    id="discountAmount"
                    name="discountAmount"
                    value={invoiceData.discountAmount}
                    onChange={handleDiscountChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="totalAmount" className="block mb-1 font-semibold text-gray-500">Total Amount</label>
                <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={!isNaN(parseFloat(invoiceData.totalAmount)) ? parseFloat(invoiceData.totalAmount).toFixed(2) : ''}
                    readOnly
                    className="border p-2 w-full bg-gray-100"
                />
            </div>
            <div className="mb-4">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save and Download PDF
                </button>
            </div>

        </div>
    );
};

export default InvoiceForm;
