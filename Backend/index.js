import express, { urlencoded } from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"
import { connect } from "./db.js";
import router from "./router.js";
const port= 2000
const app=express()


// const cookieParser=require("cookie-parser")

connect()
app.use(cookieParser()); 

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.cookie('test', 'testValue', { httpOnly: true });
  
  console.log(req.cookies);
  res.send('Cookie set!');                                                 
});

app.use("/api", router) 

app.use(express.json())

  

app.listen(port,()=>console.log("server running",port))
