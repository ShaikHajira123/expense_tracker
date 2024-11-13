// src/components/CategoryExpenseChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register all the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

function CategoryExpenseChart({ expenses }) {
    // Aggregate expenses by category
    const categoryData = expenses.reduce((acc, expense) => {
        const category = expense.category;
        if (acc[category]) {
            acc[category] += expense.amount;
        } else {
            acc[category] = expense.amount;
        }
        return acc;
    }, {});

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);

    const data = {
        labels: categories,
        datasets: [{
            label: 'Expenses by Category',
            data: amounts,
            fill: false,  // Set to false if you don't want an area chart
            borderColor: '#FF6384',
            tension: 0.1,  // For a line chart curve
            pointBackgroundColor: '#FF6384', // For point color
        }]
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
                beginAtZero: true,
            }
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: true,
                position: 'top',
            },
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md" >
            <h3 className="text-center font-semibold text-xl mb-4">Category-wise Expense Trend</h3>
            <Line data={data} options={options} />
        </div>
    );
}

export default CategoryExpenseChart;
