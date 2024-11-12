import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from './authTypes';

// Signup Action
export const signupUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await axios.post('http://localhost:3000/register', userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    localStorage.setItem({ userId: response.data._id });
    navigate('/expense');
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

// Login Action
export const login = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('http://localhost:3000/login', userData);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem('userId', response.data._id );
    navigate('/expense');
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// Logout Action
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
