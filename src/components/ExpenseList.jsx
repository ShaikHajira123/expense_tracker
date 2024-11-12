// src/components/ExpenseList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../redux/expenses/expenseActions';
import ExpenseForm from './ExpenseForm';

function ExpenseList() {
    let expenses = [] 
    expenses = useSelector(state => state.expenses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    return (
        <div>
            <h2>Expense List</h2>
            <ExpenseForm />
            <ul>
                {expenses?.length ? expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.category} - ${expense.amount} - {expense.date}
                        <button onClick={() => dispatch(deleteExpense(expense._id))}>Delete</button>
                        <button onClick={() => <ExpenseForm existingExpense={expense} />}>Edit</button>
                    </li>
                )): []}
            </ul>
        </div>
    );
}

export default ExpenseList;
