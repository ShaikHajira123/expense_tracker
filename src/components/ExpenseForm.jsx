// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense, fetchExpenses } from '../../redux/expenses/expenseActions';

function ExpenseForm({ existingExpense, onClose }) {
    const [expense, setExpense] = useState(existingExpense || { category: '', amount: 0, date: '', description: '' });
    const [alert, setAlert] = useState('');
    const [userExpenses, setUserExpenses] = useState([]);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const monthlyLimit = user?.monthlyLimit ?? 1000;
    const filters = {
        category: '',
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: ''
    }

    useEffect(() => {
        // Fetch expenses from the API or redux state
        dispatch(fetchExpenses(filters)).then((data) => {
        setUserExpenses(data);
        });
    }, [dispatch, filters]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value , userId: user?._id });
    };

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (expense.amount <= 0) {
            setAlert('Please enter a valid amount.');
            return;
            }
        
            // Calculate total expenses for the current month
            const totalExpenses = userExpenses.reduce((acc, exp) => acc + exp.amount, 0);
        
            if (totalExpenses + Number(expense.amount) > monthlyLimit) {
            setAlert('You have exceeded your monthly limit!');
            return;
            }
        if (expense._id) {
            dispatch(updateExpense(expense._id, expense));
            dispatch(fetchExpenses());
            onClose();
        } else {
            dispatch(addExpense(expense))
            .then((data) => {
            if(data) {
                setExpense({ category: '', amount: 0, date: '', description: '' });
                dispatch(fetchExpenses()).then((data) => {
                setUserExpenses(data);
                });
                onClose();
            }
            })
            .catch((error) => {

            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
         <h2 class="text-2xl font-semibold text-center mb-6 flex-grow text-center">Expense Form</h2>
        {
            alert && (
             <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span class="font-medium">Warning alert!</span> {alert}
             </div>
            )
        }
      
        <div>
            <input
                type="text"
                name="category"
                required
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
                required
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
                required
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
        <div class="flex justify-end gap-2 items-center">
        <button type="button" onClick={handleClose} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
        <button
            type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"    >
            {expense._id ? 'Update' : 'Add'} Expense
        </button>
        </div>
        
    </form>
    
    );
}

export default ExpenseForm;
