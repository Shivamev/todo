import jwt from 'jsonwebtoken';
import Users from './model.js'; // Ensure correct path and file extension

import dotenv from 'dotenv';
dotenv.config();
const authenticate = async (req, res, next) => {
    console.log("j");
    console.log(req.cookies.token);
  const {token} = req.cookies
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Users.findOne({userId:decoded.userid});
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authenticate;
