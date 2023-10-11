import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Urls } from './Urls'
import './assets/styles/index.scss';
import "react-toastify/dist/ReactToastify.css";
import { MyProvider } from './utility';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <MyProvider>
        <Urls />
      </MyProvider>
    </BrowserRouter>
  //</React.StrictMode>
  ,
)
