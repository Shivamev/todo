import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LOGIN from './pages/login.jsx';
import DASHBOARD from './pages/dashboard.jsx';
import SIGNUP from './pages/signup.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
     
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}> </Route>
      <Route path='/signup' element={<SIGNUP />}> </Route>
      <Route path='/login' element={<LOGIN />}> </Route>
      <Route path='/todo-dashboard' element={ <DASHBOARD/>}> </Route>
    </Routes>
    </BrowserRouter>
   
    </Provider>
    

)
