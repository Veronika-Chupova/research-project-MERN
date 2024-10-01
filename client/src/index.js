import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

// const isNewUser = !Boolean(localStorage.getItem('visit'))    For experiment period
const isNewUser = true    //For AFTER experiment period
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App isNewUser={isNewUser}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
