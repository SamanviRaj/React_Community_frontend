import React from 'react';
import { pdf, Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import logoImage from '../assets/google.png';

const InvoicePDF = ({ invoiceData }) => {
    return (
        <Document>
            <Page style={styles.page}>
            <View style={styles.header}>
                    {/* Adding logo at top left corner */}
                    {/* ... (logo image) */}
                    <Image style={styles.logo} src={logoImage} />

                    {/* Display Invoice Title on a new line */}
                    <Text style={styles.invoiceTitle}>Invoice</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.invoiceNumber}>Invoice Number: {invoiceData.invoiceNumber}</Text>
                    <Text style={styles.field}>Client Name: {invoiceData.clientName}</Text>
                    <Text style={styles.field}>Current Date: {invoiceData.currentDate}</Text>
                </View>

                <View style={styles.expensesTable}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.columnHeader}>Description</Text>
                        <Text style={styles.columnHeader}>Amount</Text>
                    </View>
                    {invoiceData.expenses.map((expense, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{expense.label}</Text>
                            <Text style={styles.tableCell}>₹ {parseFloat(expense.amount).toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.totalCell}>Total Amount</Text>
                        <Text style={styles.totalCell}>₹ {parseFloat(invoiceData.totalAmount).toFixed(2)}</Text>
                    </View>
                </View>

                  {/* Recipient Signature */}
                  <View style={styles.signatureContainer}>
                    <Text style={styles.signatureLabel}>Recipient Signature:</Text>
                    <View style={styles.signatureBox} />
                </View>

                {/* Digital Copy Note */}
                <View style={styles.digitalCopyNote}>
                    <Text style={styles.noteTitle}>Note:</Text>
                    <Text style={styles.noteText}>
                        This is a digital copy and does not require an authorized signature. Please keep this
                        electronic document for your records. Thank you for your business.
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for your business.</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for your business.</Text>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 30,
    },
    header: {
        marginBottom: 20,
        flexDirection: 'column', // Change to column to align items vertically
        alignItems: 'center', // Center horizontally within the flex container
        justifyContent: 'center', // Center vertically within the flex container
    },
    invoiceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10, // Add space between logo and title
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 10, // Adjust the font size here
        marginBottom: 20,
    },
    invoiceNumber: {
        fontSize: 12, // Adjust the font size here
        marginBottom: 10,
    },
    field: {
        marginBottom: 8, // Adjust the margin here
    },
    expensesTable: {
        border: '1pt solid black',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        padding: '5pt',
        backgroundColor: '#f2f2f2',
        borderBottom: '1pt solid black',
    },
    columnHeader: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        padding: '5pt',
        fontSize: 10, // Adjust the font size here
    },
    tableRow: {
        flexDirection: 'row',
        padding: '5pt',
        borderBottom: '1pt solid black',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        padding: '5pt',
        fontSize: 10, // Adjust the font size here
    },
    totalCell: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        padding: '5pt',
        fontSize: 10, // Adjust the font size here
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    signatureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    signatureLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    signatureBox: {
        width: 100,
        height: 40,
        border: '1pt solid black',
        marginLeft: 5,
    },

    digitalCopyNote: {
        marginTop: 20,
    },
    noteTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noteText: {
        fontSize: 10,
        textAlign: 'justify',
    },
    footerText: {
        fontSize: 8, // Adjust the font size here
    },
});

export default InvoicePDF;
