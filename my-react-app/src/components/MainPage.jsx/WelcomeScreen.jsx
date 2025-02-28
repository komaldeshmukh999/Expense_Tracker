
// src/components/WelcomeScreen.js
import React from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

export default function WelcomeScreen() {

  return (
    <div>
      <div>
        <ExpenseForm />  
        <ExpenseList/>
        </div>
    </div>
  );
}