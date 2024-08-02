import {  ADD_COMPLETED, ADD_TASKS_SUCCESS, DELETE_TASKS_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../action"

const initialTasks={
    tasks:[],
    isLoading:false,
    error:null,
    message:null,
    completedTasks:[],  
}

const initialState = {
    loading: false,
    user: null,
    error: null,
    token:null
  };

export  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REGISTER_USER_SUCCESS:
        
        return {
          ...state,
          loading: false,
          user: action.payload.user,
        };
      case REGISTER_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case LOGIN_USER_REQUEST:
        
        return {
          ...state,
          loading: true,
          error: null
        };
      case LOGIN_USER_SUCCESS:
        
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token:action.payload.token
        };
      case LOGIN_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };

export const tasksRducer=(state=initialTasks,action)=>{
    switch(action.type){
        case "FETCH_TASKS_REQUEST":
            return{
                ...state,
                isLoading:true
            }
        case "FETCH_TASKS_SUCCESS":
            return{
                ...state,
                tasks:action.payload,
                isLoading:false
            }
        case "FETCH_TASKS_FAILURE":
            return{
                ...state,
                error:action.payload,
                isLoading:false
            }
      
        case ADD_TASKS_SUCCESS:
            console.log(action.payload,"uu");
            return{
                ...state,
                tasks:[...state.tasks,action.payload],
                isLoading:false
            }
        case ADD_COMPLETED:
            console.log(action.payload,"yy");
          
            return {
                ...state,
                tasks: state.tasks.map((task) => 
                  task.task === action.payload.task ? { ...task, status: 'success' } : task
                ),
                completedTasks: [...state.completedTasks, {...action.payload, status: 'success'}],
              };
      
        case "UPDATE_TASKS_REQUEST":
            return{
                ...state,
                isLoading:true
            }
        case "UPDATE_TASKS_SUCCESS":
            return{
                ...state,
                tasks:action.payload,
                isLoading:false
            }
        case "UPDATE_TASKS_FAILURE":
            return{
                ...state,
                error:action.payload,
                isLoading:false
            }
        case "DELETE_TASKS_REQUEST":
            return{
                ...state,
                isLoading:true
            }
        case DELETE_TASKS_SUCCESS:
            return{
                ...state,
                tasks:state.tasks.filter((e)=>{
                    
                       
                            e.task !== action.payload
                        
                   
                }),
                isLoading:false
            }
        case "DELETE_TASKS_FAILURE":
            return{
                ...state,
                error:action.payload,
                isLoading:false
            }
        default:
            return state
    }
}
