export const ADD_TASKS_REQUEST="ADD_TASKS_REQUEST"
export const ADD_TASKS_SUCCESS="ADD_TASKS_SUCCESS"
export const ADD_TASKS_FAILURE="ADD_TASKS_FAILURE"
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
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

export const addTask= (task) => async (dispatch) => {
  dispatch({ type:ADD_TASKS_REQUEST });

  try {
    console.log(task,"hihi");
    
    const response = await axios.post('http://localhost:2000/api/addtask', {task: task},{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true, // Include credentials (cookies)
      // You can also add other settings like `maxRedirects` if needed
    });
    console.log(response.data,"res");
    // navigate("/login")
    toast.success('Task Added');
    dispatch({
      type: ADD_TASKS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TASKS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const deleteTask = (task) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });

  try {
    const response = await axios.post('http://localhost:2000/api/deletetask', { task }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true, 
    });
    toast.success('Task deleted');
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const addCompleted=(task)=>{
  toast.success('Task completed');
    return{
        type:ADD_COMPLETED,
        payload:task
    }
}

// export const deleteTask=(task)=>{
//     return{
//         type:DELETE_TASKS_SUCCESS,
//         payload:task
//     }
// }


// Action creator for registering a user
export const registerUser = (userData,navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    
    const response = await axios.post('http://localhost:2000/api/signup', userData);
    console.log(response.data,"res");
    navigate("/login")
    toast.success('User Registered');
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
      toast.success("User Logged in succeddfully")
    } catch (error) {
      toast.error("Invalid Credentials")
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
