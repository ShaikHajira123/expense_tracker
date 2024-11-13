import axios from 'axios';
import {
    ADD_EXPENSE,
    FETCH_EXPENSES,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from './expenseTypes'

// Action Creators
export const addExpense = (expense) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3000/expenses', expense);
        dispatch({ type: ADD_EXPENSE, payload: response.data });
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error.message)
    }
};

export const fetchExpenses = (filters) => async dispatch => {
    try {
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        let query = `http://localhost:3000/expenses/${userId}?`;

        if (filters.category) {
            query += `category=${filters.category}&`;
        }
        if (filters.startDate) {
            query += `startDate=${filters.startDate}&`;
        }
        if (filters.endDate) {
            query += `endDate=${filters.endDate}&`;
        }
        if (filters.minAmount) {
            query += `minAmount=${filters.minAmount}&`;
        }
        if (filters.maxAmount) {
            query += `maxAmount=${filters.maxAmount}&`;
        }

        // Trim the trailing "&" if any
        query = query.endsWith('&') ? query.slice(0, -1) : query;

        const response = await axios.get(query);
        dispatch({ type: FETCH_EXPENSES, payload: response.data });
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error.message)
    }

};

export const updateExpense = (id, expense) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:3000/expenses/${id}`, expense);
        dispatch({ type: UPDATE_EXPENSE, payload: response.data });
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error.message)
    }

};

export const deleteExpense = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:3000/expenses/${id}`);
        dispatch({ type: DELETE_EXPENSE, payload: id });
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error.message)
    }
};
