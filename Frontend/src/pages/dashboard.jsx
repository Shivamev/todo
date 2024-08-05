import { useDispatch, useSelector } from "react-redux";
import TASKINPUT from "../component/taskinput";
import TASKLIST from "../component/tasklist";
import "./dashboard.css"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { checkAuth } from "../redux/action";
import { Toaster, toast } from 'sonner';

function DASHBOARD() {

    const user=useSelector((state)=>state.user.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        dispatch(checkAuth(navigate))
    },[])
    return (
        
        <section className="d-flex flex-column justify-content-center align-items-center my-5 py-2">
            <Toaster richColors position="top-center"/>
            <div className="my-2">
                <h1 className="fw-bold text-light half-border-bottom">To Do List</h1>
            </div>
            <div className="main-content pt-4 pb-2 px-5">
                <div class="container ">
                    <div className=" typewriter"><span className="typewriter-text">Hi, {user?user.userId:""}</span></div>
                    <hr className="mb-4 mt-0 w-25 text-white"/>
                    <TASKINPUT></TASKINPUT>
                    <TASKLIST></TASKLIST>

                
                </div>
            </div>
        </section>

    )
}

export default DASHBOARD