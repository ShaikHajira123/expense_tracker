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
    if (response?.data?.user) {
      localStorage.setItem('user', JSON.stringify(response?.data?.user));
      localStorage.setItem('token', response.data?.token);
      dispatch({ type: 'USER_AUTHENTICATED', payload: response.data?.token });
    }

    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    return Promise.resolve(response.data?.user ? response.data.user : response.data);
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    return Promise.reject(error.message);
  }
};

// Login Action
export const login = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('http://localhost:3000/login', userData);
    if (response?.data?.user) {
      localStorage.setItem('user', JSON.stringify(response?.data?.user));
      localStorage.setItem('token', response.data?.token);
      dispatch({ type: 'USER_AUTHENTICATED', payload: response.data?.token });
    }

    dispatch({ type: LOGIN_SUCCESS, payload: response.data?.user });
    return Promise.resolve(response.data?.user ? response.data.user : response.data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    return Promise.reject(error.message);
  }
};

// Logout Action
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
