import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdate } from '../../store/Slices/authSlice';
import "./WelcomeScreen.css";
export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]); // Initialize with an empty array
      const [editingExpenseId, setEditingExpenseId] = useState(null);
      const [editedExpense, setEditedExpense] = useState({ price: '', category: '', description: '' });
      const update1 = useSelector((state) => state.auth.update1);
      const dispatch = useDispatch();
     
      useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          const expensesRef = ref(db, `users/${user.uid}/expenses`);
          const unsubscribe = onValue(expensesRef, (snapshot) => {
            const expensesData = snapshot.val();
            if (expensesData) {
              const expensesList = Object.keys(expensesData).map((key) => ({
                id: key,
                ...expensesData[key],
              }));
              setExpenses(expensesList);
            } else {
              setExpenses([]); // Set to an empty array instead of undefined
            }
            setLoading(false);
          });
        }
      })

    
    
      const handleEdit = (expense) => {
        setEditingExpenseId(expense.id);
        setEditedExpense({ ...expense });
      };
    //this will update the expense card
      const handleUpdate = async () => {
        try {
          const user = auth.currentUser;
          if (user && editingExpenseId) {
            const expenseRef = ref(db, `users/${user.uid}/expenses/${editingExpenseId}`);
            await update(expenseRef, editedExpense);
            setEditingExpenseId(null);
            dispatch(setUpdate(!update1));
          }
        } catch (error) {
          console.error('Error updating expense:', error);
        }
      };
    
      const handleRemove = async (expenseId) => {
        try {
          const user = auth.currentUser;
          if (user) {
            const expenseRef = ref(db, `users/${user.uid}/expenses/${expenseId}`);
            await remove(expenseRef);
            dispatch(setUpdate(!update1));
          }
        } catch (error) {
          console.error('Error removing expense:', error);
        }
      };
    
  return (
    <div>
      <div className="expense-list-container">
          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            <ul>
              {expenses.map((expense) => (
                <div key={expense.id} className="expense-list-card">
                  <div className="expense-card-content">
                    <div className="expense-details">
                      <span className="expense-price">₹{expense.price}</span>
                      <span className="expense-category">{expense.category}</span>
                    </div>
                    <p className="expense-description">{expense.description}</p>
                    <div className="expense-actions">
                      {/* //editingExpense */}
                      {editingExpenseId === expense.id ? (
                        <div>
                          <input type="number" value={editedExpense.price} onChange={(e) => setEditedExpense({ ...editedExpense, price: e.target.value })} />
                          <input type="text" value={editedExpense.category} onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })} />
                          <input type="text" value={editedExpense.description} onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })} />
                          <button onClick={handleUpdate}>Update</button>
                          <button onClick={() => setEditingExpenseId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => handleEdit(expense)} className="btn btn-success">Edit</button>
                          <button onClick={() => handleRemove(expense.id)} className="btn btn-danger">Remove</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
    </div>
  )
        }
