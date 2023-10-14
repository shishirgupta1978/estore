import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import HomePage from './HomePage';
import NotFound from './NotFound';
import Account from '../account';
import Stores from '../stores';


const Pages = () => {
    return (
      <Routes>
      <Route path="/"  element={<HomePage/>}/>
      <Route path="/*" element={<Account/>}/>
      <Route path="/contact-us/"  element={<ContactUs/>}/>
      <Route path="/about-us/" element={<AboutUs/>}/>
      <Route path="/website/*" element={<Stores/>}/>
      <Route path="/not-found/"  element={<NotFound/>}/>
      
      
          
      </Routes>
    )
  }
  export {AboutUs,ContactUs,NotFound}
  export default Pages;
  