import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function MonthlyExpenseChart({ expenses, monthlyLimit }) {
    // Aggregate expenses by month
    const monthlyData = expenses.reduce((acc, expense) => {
        const month = expense.date.substring(0, 7); // e.g., '2024-11'
        if (acc[month]) {
            acc[month] += expense.amount;
        } else {
            acc[month] = expense.amount;
        }
        return acc;
    }, {});

    const months = Object.keys(monthlyData);
    const amounts = Object.values(monthlyData);

    const data = {
        labels: months,
        datasets: [{
            label: 'Monthly Expenses',
            data: amounts,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    };

    // Check if the user exceeded the monthly limit
    const exceededLimit = amounts.some(amount => amount > monthlyLimit);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-center font-semibold text-xl mb-4">Monthly Expense Trend</h3>
            {exceededLimit && (
                <div className="text-red-600 font-semibold text-center mb-4">
                    Warning: Some months exceeded your set monthly limit!
                </div>
            )}
            <Line data={data} />
        </div>
    );
}

export default MonthlyExpenseChart;
