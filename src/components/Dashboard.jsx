// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import CategoryExpenseChart from '../components/CategoryExpenseChart';
import MonthlyExpenseChart from '../components/MonthlyExpenseChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../../redux/expenses/expenseActions';
import Analytics from './Analytics';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const expenses = useSelector(state => state.expense.expenses);
    const [monthlyLimit, setMonthlyLimit] = useState(JSON.parse(localStorage.getItem('user'))?.monthlyLimit || 1000); // Set default limit

    useEffect(() => {
        dispatch(fetchExpenses()); // Fetch expenses when the dashboard loads
    }, [dispatch]);

    const handleNavigate = () => {
        navigate('/expense');
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Expense Tracker Dashboard</h2>
           
            <div className="flex justify-between mb-6">
                <input
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Set Monthly Limit"
                />
                 <button onClick={handleNavigate} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add Expense / Expense List
                    </span>
                </button>
            </div>

           

            <div class="flex gap-2">
                <CategoryExpenseChart expenses={expenses} />
                <MonthlyExpenseChart expenses={expenses} monthlyLimit={monthlyLimit} />
                <Analytics />
            </div>
            
        </div>
    );
}

export default Dashboard;
