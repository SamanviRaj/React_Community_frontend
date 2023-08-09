import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        marginLeft: 10,
    },
});

const InvoicePDF = ({ invoiceData }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Invoice</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Invoice Number:</Text>
                    <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Client Name:</Text>
                    <Text style={styles.value}>{invoiceData.clientName}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Current Date:</Text>
                    <Text style={styles.value}>{invoiceData.currentDate}</Text>
                </View>

                {invoiceData.expenses.map((expense, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{expense.label}</Text>
                        <Text style={styles.tableCell}>
                            {typeof expense.amount === 'number' ? `₹ ${expense.amount.toFixed(2)}` : ''}
                        </Text>
                    </View>
                ))}

                <View style={styles.section}>
                    <Text style={styles.label}>Discount Amount:</Text>
                    <Text style={styles.value}>{`₹${invoiceData.discountAmount.toFixed(2)}`}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Total Amount:</Text>
                    <Text style={styles.value}>{`₹${invoiceData.totalAmount.toFixed(2)}`}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
