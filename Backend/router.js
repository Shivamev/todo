import express from 'express';
import { registerUser, loginUser, logout, checkAuth } from './controller.js';
import authenticate from './middleware.js';

const router = express.Router();

router
  .post('/signup', registerUser)
  .post('/login', loginUser)
  .post('/logout', logout)
  .post("/authUser",authenticate,checkAuth)

export default router;