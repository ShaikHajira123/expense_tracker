import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../redux/expenses/expenseActions';
import ExpenseForm from './ExpenseForm';
import { useNavigate } from 'react-router-dom';

function ExpenseList() {
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: ''
    });

    const expenses = useSelector((state) => state.expense.expenses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchExpenses(filters));
    }, [dispatch, filters]);


    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setShowForm(true);
    };

    const handleAddExpense = () => {
        setEditingExpense(null); // Resets form to add a new expense
        setShowForm(true);
    };

    const handleNavigate = () => {
        navigate('/dashboard'); // Navigates to the /dashboard route
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };


    return (
        <div className="p-8">
          <button onClick={handleNavigate} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Go To Dashboard
            </span>
          </button>

          {/* Show Expense Form */}
          {showForm && (
            <div className="mt-8">
            <ExpenseForm
                existingExpense={editingExpense}
                onClose={() => setShowForm(false)}
            />
            </div>
        )}

          {/* Add Expense Button */}
          <div class="flex justify-between items-center w-full mt-8">
             <h2 class="text-2xl font-semibold text-center mb-6 flex-grow text-center">Expense List</h2>
  
          {!showForm && (
            <button onClick={handleAddExpense} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Add Expense
            </button>
          )}
          </div>

          {/* Filters Section */}
          <div className="mb-4">
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="Category"
              className="border p-2 mr-2 rounded"
            />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="border p-2 mr-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="border p-2 mr-2 rounded"
            />
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
              placeholder="Min Amount"
              className="border p-2 mr-2 rounded"
            />
            <input
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
              placeholder="Max Amount"
              className="border p-2 mr-2 rounded"
            />
          </div>

               
          
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Category</th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Amount ($)</th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Date</th>
                  <th className="py-3 px-6 text-left text-gray-700 font-semibold">Description</th>
                  <th className="py-3 px-6 text-center text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses?.length ? (
                  expenses.map((expense) => (
                    <tr key={expense._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">{expense.category}</td>
                      <td className="py-4 px-6">${expense.amount}</td>
                      <td className="py-4 px-6">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="py-4 px-6">{expense.description}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => dispatch(deleteExpense(expense._id))}
                          className="mr-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(expense)}
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
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

export default ExpenseList;
