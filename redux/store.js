import authReducer from './auth/authReducer';
import expenseReducer from './expenses/expenseReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
   expense: expenseReducer,
   auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;