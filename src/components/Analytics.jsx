import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function Analytics() {
    const [analyticsData, setAnalyticsData] = useState({
        categoryExpenses: [],
        monthlyExpenses: []
    });
    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        // Fetch analytics data
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/analytics/${userId}`);
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Error fetching analytics data", error);
            }
        };

        fetchAnalytics();
    }, [userId]);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Analytics</h2>

            {/* Category-wise Expenses */}
            <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Total Expenses by Category</h3>
                <div className="overflow-x-auto mt-8">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Category</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Total Amount ($)</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Percentage (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyticsData?.categoryExpenses?.length ? analyticsData.categoryExpenses.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{item._id}</td>
                                <td className="py-4 px-6">${item.totalAmount}</td>
                                <td className="py-4 px-6">{item.percentage.toFixed(2)}%</td>
                            </tr>
                        )):
                         (
                            <tr>
                              <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                No expenses found.
                              </td>
                            </tr>
                          )}
                    </tbody>
                </table>
           </div>

            </div>

            {/* Monthly Expenses */}
            <div className="overflow-x-auto mt-8">
                <h3 className="text-xl font-medium mb-4">Monthly Expenses</h3>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Month-Year</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Total Amount ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyticsData?.monthlyExpenses?.length ? analyticsData.monthlyExpenses.map((item) => (
                            <tr key={`${item._id.year}-${item._id.month}`} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{`${item._id.month}-${item._id.year}`}</td>
                                <td className="py-4 px-6">${item.totalAmount}</td>
                            </tr>
                        ))
                        : (
                            <tr>
                              <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                No expenses found.
                              </td>
                            </tr>
                          )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Analytics;
