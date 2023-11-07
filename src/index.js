import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './Components/register';
import Login from './Components/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div>
    <p>Register</p>
    <Register/>
    <br></br>
    <p>Login</p>
    <Login/>
</div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
