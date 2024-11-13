import { ADD_EXPENSE, FETCH_EXPENSES, UPDATE_EXPENSE, DELETE_EXPENSE } from './expenseTypes';

const initialState = {
    expenses: []
};

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return { ...state, expenses: [...state.expenses, action.payload] };
        case FETCH_EXPENSES:
            return { ...state, expenses: action.payload };
        case UPDATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map(expense =>
                    expense._id === action.payload._id ? action.payload : expense
                )
            };
        case DELETE_EXPENSE:
            return { ...state, expenses: state.expenses.filter(expense => expense._id !== action.payload) };
        default:
            return state;
    }
};

export default expenseReducer;
