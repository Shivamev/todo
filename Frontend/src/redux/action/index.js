export const ADD_TASKS_SUCCESS="ADD_TASKS_SUCCESS"
export const ADD_COMPLETED="ADD_COMPLETED"
export const DELETE_TASKS_SUCCESS="DELETE_TASKS_SUCCESS"
export const REGISTER_USER_REQUEST="REGISTER_USER_REQUEST"
export const REGISTER_USER_SUCCESS="REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILURE="REGISTER_USER_FAILURE"
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE'
import Cookies from 'js-cookie';
import axios from 'axios';

export const addTask=(task)=>{
    return{
        type:ADD_TASKS_SUCCESS,
        payload:task
    }
}
export const addCompleted=(task)=>{
    return{
        type:ADD_COMPLETED,
        payload:task
    }
}

export const deleteTask=(task)=>{
    return{
        type:DELETE_TASKS_SUCCESS,
        payload:task
    }
}

// Action creator for registering a user
export const registerUser = (userData,navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    
    const response = await axios.post('http://localhost:2000/api/signup', userData);
    console.log(response.data,"res");
    navigate("/login")
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const checkAuth = (navigate) => async (dispatch) => {
    dispatch({ type: AUTH_CHECK_REQUEST });
  
    try {
      const response = await axios.post('http://localhost:2000/api/authUser',{},{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
        });
      if (response.data.success) {
        console.log(response.data);
        dispatch({
          type: AUTH_CHECK_SUCCESS,
          payload: response.data.user,
        });
      } else {
        navigate("/login")
        dispatch({
          type: AUTH_CHECK_FAILURE,
          payload: 'User is not authenticated',
        });
      }
    } catch (error) {
        navigate("/login")
      dispatch({
        type: AUTH_CHECK_FAILURE,
        payload: 'Authentication failed',
      });
    }
  };

export const loginUser = (userData,navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
  
    try {
      const response = await axios.post('http://localhost:2000/api/login', userData,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true, // Include credentials (cookies)
        // You can also add other settings like `maxRedirects` if needed
      });
      console.log(response.data,"res");
      navigate("/todo-dashboard")
    //   Cookies.set('token', response.data.token, { expires: 1 });
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
