import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { auth, db } from '../../firebase/firebase';
import { ref, onValue } from 'firebase/database';

 
export default function ExpensePDFGenerator() {
    const [expensesp, setExpenses] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const expensesRef = ref(db, `users/${user.uid}/expenses`);
            onValue(expensesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const expensesList = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setExpenses(expensesList);
                } else {
                    setExpenses([]);
                }
            });
        }
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Expense Report', 10, 10);

        let y = 30; // Starting Y position

        expenses.forEach((expense) => {
            doc.text(`Price: ${expense.price}`, 10, y);
            doc.text(`Category: ${expense.category}`, 60, y);
            doc.text(`Description: ${expense.description}`, 110, y);
            y += 10; // Increment Y position for next expense
        });

        doc.save('expenses.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Download Expense Pdf</button>
        </div>
    );
}