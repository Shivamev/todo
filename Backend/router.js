import express from 'express';
import { registerUser, loginUser, logout, checkAuth, addTask, deleteTask } from './controller.js';
import authenticate from './middleware.js';

const router = express.Router();

router
  .post('/signup', registerUser)
  .post('/login', loginUser)
  .post('/logout', logout)
  .post("/authUser",authenticate,checkAuth)
  .post("/addtask",authenticate,addTask)
  .post("/deletetask",authenticate,deleteTask)

export default router;