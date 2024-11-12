import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT,
  } from './authTypes';
  
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          token: action.payload.token,
        };
      case SIGNUP_FAILURE:
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  