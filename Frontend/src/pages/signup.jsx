import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./signup.css";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action';

const SignupSchema = Yup.object().shape({



  userId: Yup.string().required('User ID is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});



function SIGNUP() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <section className="d-flex flex-column justify-content-center align-items-center my-5 py-2 overflow-hidden">
      <div className="my-2 signup d-flex flex-column justify-content-center align-items-center">
        <div className="text-white w-100 text-center sign-head mt-2 mb-5">SignUp</div>
        <Formik
          initialValues={{
            userId: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            dispatch(registerUser(values,navigate))
            console.log(values);
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="wave-group">
                <Field name="userId" type="text" className="input text-light" required />
                <span className="bar" />
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 }}>U</span>
                  <span className="label-char" style={{ '--index': 1 }}>S</span>
                  <span className="label-char" style={{ '--index': 2 }}>E</span>
                  <span className="label-char" style={{ "--index": 3 }}>R &nbsp;</span>
                  <span className="label-char" style={{ "--index": 4 }}>I</span>
                  <span className="label-char" style={{ "--index": 5 }}>D</span>
                </label>
                <ErrorMessage name="userId" component="div" className="error-message text-red" style={{fontSize:"12px"}}/>
              </div>
              <div className="wave-group my-5">
                <Field name="password" type="password" className="input text-light" required />
                <span className="bar" />
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 }}>P</span>
                  <span className="label-char" style={{ '--index': 1 }}>A</span>
                  <span className="label-char" style={{ '--index': 2 }}>S</span>
                  <span className="label-char" style={{ "--index": 3 }}>S</span>
                  <span className="label-char" style={{ "--index": 4 }}>W</span>
                  <span className="label-char" style={{ "--index": 5 }}>O</span>
                  <span className="label-char" style={{ "--index": 6 }}>R</span>
                  <span className="label-char" style={{ "--index": 7 }}>D</span>
                </label>
                <ErrorMessage name="password" component="div" className="error-message" style={{fontSize:"12px"}}/>
              </div>
              <div className="wave-group my-5">
                <Field name="confirmPassword" type="password" className="input text-light text-red" required />
                <span className="bar" />
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 }}>C</span>
                  <span className="label-char" style={{ '--index': 1 }}>O</span>
                  <span className="label-char" style={{ '--index': 2 }}>N</span>
                  <span className="label-char" style={{ "--index": 3 }}>F</span>
                  <span className="label-char" style={{ "--index": 4 }}>I</span>
                  <span className="label-char" style={{ "--index": 5 }}>R</span>
                  <span className="label-char" style={{ "--index": 6 }}>M</span>
                </label>
                <ErrorMessage name="confirmPassword" component="div" className="error-message text-red" style={{fontSize:"12px"}}/>
              </div>
              <div className='w-100 d-flex justify-content-center'>
                <button type="submit" className="btn btn-success">Register</button>
                
              </div>
              <div className='w-100 d-flex justify-content-center mt-3'>
                <p>Already have an account? <Link to="/login" className="text-light">Login</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SIGNUP;
