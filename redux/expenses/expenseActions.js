import axios from 'axios';
import {
    ADD_EXPENSE,
    FETCH_EXPENSES,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from './expenseTypes'

// Action Creators
export const addExpense = (expense) => async dispatch => {
    const response = await axios.post('http://localhost:3000/expenses', expense);
    dispatch({ type: ADD_EXPENSE, payload: response.data });
};

export const fetchExpenses = () => async dispatch => {
    const response = await axios.get('http://localhost:3000/expenses');
    dispatch({ type: FETCH_EXPENSES, payload: response.data });
};

export const updateExpense = (id, expense) => async dispatch => {
    const response = await axios.put(`http://localhost:3000/expenses/${id}`, expense);
    dispatch({ type: UPDATE_EXPENSE, payload: response.data });
};

export const deleteExpense = (id) => async dispatch => {
    await axios.delete(`http://localhost:3000/expenses/${id}`);
    dispatch({ type: DELETE_EXPENSE, payload: id });
};
