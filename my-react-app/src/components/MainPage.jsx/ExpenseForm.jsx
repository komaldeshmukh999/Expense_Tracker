
import React, { useState } from 'react';
import "./ExpenseForm.css";
import { auth, db } from '../../firebase/firebase';
import { ref, push } from 'firebase/database';
export default function ExpenseForm() {
    const [expense, setExpense] = useState({
        price: '',
        category: 'travel',
        description: '',
    });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.id]: e.target.value });
    };

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;//checking for the recent user
            if (user) {
                //expensesRef hold refrense to the expenses node
                const expensesRef = ref(db, `users/${user.uid}/expenses`);//adding expenses
                await push(expensesRef, expense);//add the expense
                setExpense({ price: '', category: 'food', description: '' });//reset expense object
            } else {
                console.error('User not logged in');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="expense-form-container">
            <h2 className="expense-form-title">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={expense.price}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            value={expense.category}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="food">Food</option>
                            <option value="petrol">Petrol</option>
                            <option value="salary">Salary</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="bills">Bills</option>
                            <option value="shopping">Shopping</option>
                            <option value="travel">Travel</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        value={expense.description}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter description"
                    />
                </div>
                <button type="submit" className="form-button">Add Expense</button>
            </form>
        </div>
    );
}