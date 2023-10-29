import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import Stores from '../stores';


const Pages = () => {
    return (
      <Routes>
      <Route path="website/*" element={<Stores/>}/>
      
      
      
          
      </Routes>
    )
  }
  export default Pages;
  