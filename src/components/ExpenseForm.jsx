// src/components/ExpenseForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../../redux/expenses/expenseActions';

function ExpenseForm({ existingExpense }) {
    const [expense, setExpense] = useState(existingExpense || { category: '', amount: 0, date: '', description: '' });
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value , ...userId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense._id) {
            dispatch(updateExpense(expense._id, expense));
        } else {
            dispatch(addExpense(expense));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
        <div>
            <input
                type="text"
                name="category"
                value={expense.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <input
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <input
                type="date"
                name="date"
                value={expense.date}
                onChange={handleChange}
                placeholder="Date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <textarea type="description"
                name="description"
                value={expense.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                
            </textarea>
        </div>
        <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {expense._id ? 'Update' : 'Add'} Expense
        </button>
    </form>
    
    );
}

export default ExpenseForm;
