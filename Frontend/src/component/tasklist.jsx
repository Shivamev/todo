import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./tasklist.css"
import { addCompleted, deleteTask } from "../redux/action";

function TASKLIST() {
    const [activeDiv, setActiveDiv] = useState('allTasks');
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks.tasks)
    const compTasks = useSelector((state) => state.tasks.completedTasks)
    console.log(tasks, "hi");
    console.log(compTasks, "hifgg");
    let showTasks = ""
    if (activeDiv == "allTasks") {
        showTasks = tasks
    }
    else {
        showTasks = compTasks
    }

   

    return (
        <>
            <div className="d-flex text-center my-3 filter ">
                <div
                    className={`w-50 px-2 py-1  border-end filt-color ${activeDiv === 'allTasks' ? 'active' : ''}`}
                    onClick={() => setActiveDiv('allTasks')}
                >
                    <p className="h-100">All&nbsp;Tasks</p>
                </div>
                <div
                    className={`w-50 px-2 py-1  filt-color-2  ${activeDiv === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveDiv('completed')}
                >
                    <p className="h-100">Completed</p>
                </div>
            </div>

            <div className="my-4 mostly-customized-scrollbar" style={{ maxHeight: "240px" }}>
                {showTasks==""?<p className="text-white text-center mt-3">Loading...</p>:showTasks.map((task, i) => {
                    return (
                        <>
                            <div className="w-100 tasks mt-3 row  border border-success rounded" key={i} style={{ height: "65px" }}>


                                <div className="col-1 my-2 d-flex justify-content-center align-items-center" ><div className=" bg-success rounded-circle" style={{ width: "30%", height: "10px" }}></div></div>
                                <div className="col-9 pt-1 d-flex flex-column justify-content-center gap-1">
                                    <input type="text" className={`${task.status=="success" && activeDiv=="allTasks"?"text-decoration-line-through":""} `} style={{  fontSize: "18px !important", color: "lightgreen" , background:"transparent", border:"none" }} value={task.task} disabled/>
                                    <input type="text" className={`${task.status=="success" && activeDiv=="allTasks"?"text-decoration-line-through":""}  ${task.description==""?"d-none":"d-block"}`} style={{ color: "grey", fontSize: "12px", height: "15px", overflow: "hidden", background:"transparent", border:"none"  }} value={task.description} disabled/>
                                </div>
                                <div className="col-2 d-flex justify-content-evenly align-items-center">
                                    <button
                                    style={{border:"none"}}
                                        className={`btn  ${task.status=="success"?"disabled ": ""}`}
                                        onClick={() => {
                                            if (task.status !== "success") {
                                                dispatch(addCompleted(task));
                                                console.log(task.status);
                                            }
                                        }}
                                        disabled={task.status === "success"} 
                                    >
                                        <span className={`material-symbols-outlined  fw-light   ${task.status=="success"?" text-success": "text-light"}`} c>
                                            check_circle
                                        </span>
                                    </button >
                                    <button style={{border:"none"}} className={`btn `}  onClick={()=>dispatch(deleteTask(task))}>
                                        <span className="material-symbols-outlined text-light fw-light del">
                                            delete
                                        </span>
                                    </button>
                                </div>


                            </div>
                        </>
                    )
                })}


            </div>
        </>
    )
}

export default TASKLIST