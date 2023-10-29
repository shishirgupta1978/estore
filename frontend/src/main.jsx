import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import './assets/styles/index.scss';
import "react-toastify/dist/ReactToastify.css";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useLocation, useParams } from 'react-router-dom'
import { Provider } from './context';
import Pages from './pages'
import { ToastContainer } from "react-toastify";
import Account from './account';
import Stores from './stores';



ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter> 
    <Provider>
      <Routes>
        <Route path="/"  element={<Navigate to="/account/"/>}/>
        <Route path="/account/*"  element={<Account/>}/>
        <Route path="/store/*"  element={<Stores/>}/>
       </Routes>
      <ToastContainer theme="dark" />
    </Provider>
   
    </BrowserRouter>
  //</React.StrictMode>
  ,
)
