import { configureStore } from "@reduxjs/toolkit";
import { tasksRducer, usersReducer } from "../reducer";


const store=configureStore({
    reducer:{ 
        user:usersReducer
    }
})

export default store