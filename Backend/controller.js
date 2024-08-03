import Users from './model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
    console.log("fdg");
    try {
        console.log(req.body);
        const { userId, password } = req.body;
        const existingUser = await Users.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        } else {
            const hashPass = await bcrypt.hash(password, 10);

            const newUser = new Users({
                userId,
                password: hashPass,
            });

            const savedUser = await newUser.save();
            res.status(200).json({
                success: true,
                message: "User registered",
                user: savedUser,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await Users.findOne({ userId });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        } else {
            const pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.status(400).json({ success: false, message: "Password is incorrect" });
            } else {
                const token = jwt.sign(
                    { userid: user._id },
                    process.env.JWT_SECRET_KEY
                );

                user.token = token;
                const savedUser = await user.save();
            //    res.cookie("token", token, {
            //         httpOnly: true,
            //         expires: new Date(Date.now() + 600000),
            //     });
            res.cookie("token", token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                expires: new Date(Date.now() + 600000), // Cookie expiration
                // secure: true, // Only send cookie over HTTPS
                // sameSite: "none",
                
            });
            // console.log(req.cookies);
                // console.log("hjghg");
                res.status(200).json({ success: true, message: "Login successful", user: savedUser });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};


// controller.js
const checkAuth = async (req, res) => {
    // console.log(req.cookies,"y");
    if (req.user) { // Check if user is authenticated
      res.status(200).json({ success: true, user: req.user });
    } else {
      res.status(401).json({ success: false, message: 'Not authenticated' });
    } 
  }; 

  const logout = async (req, res) => {
    const { name } = req.body;
    const user = await Users.findOne({ name });
    if (user) {
        user.token = "";
        res.clearCookie("token");
        await user.save();
        res.status(200).json({ success: true, message: "Logged out successfully", user: "" });
    } else {
        res.status(400).json({ success: false, message: "User not found" });
    }
};

  

export { registerUser, loginUser, logout, checkAuth };
