import { useFormik } from "formik";
import "../pages/dashboard.css"
import { useDispatch } from "react-redux";
import { addTask } from "../redux/action";

function TASKINPUT(){

    const dispatch =useDispatch()


    const formik = useFormik({
        initialValues: {
          task: '',
          description: '',
          status: "pending"
        },
        
        onSubmit: values => {
          console.log('Form data', values);
          dispatch(addTask(values))
        }
      });
    return(
        <>
          <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-5">
          <p className="text-light">Task :</p>
          <input
            className="border rounded my-2 w-100 px-3 input"
            type="text"
            placeholder="Add Task"
            name="task"
            onChange={formik.handleChange}
            value={formik.values.task}
          />
        </div>
        <div className="col-5">
          <p className="text-light">Description :</p>
          <input
            className="border rounded my-2 w-100 px-3 input"
            type="text"
            placeholder="Add Description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="col-2 text-center d-flex align-items-end py-2 justify-content-center">
          <button className="btn add px-3" type="submit">Add</button>
        </div>
      </div>
    </form>
        </>
    )
}

export default TASKINPUT