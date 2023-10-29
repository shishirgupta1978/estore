import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import {LoginReguired,ChangePassword,Profile} from '../account';
import { AboutUs,ContactUs } from '../account';
import { useLocation } from 'react-router-dom';
import StoreProfile from './StoreProfile';
import CategoryProfile from './CategoryProfile';
import BannerProfile from './BannerProfile';
import ProductProfile  from './ProductProfile';
import Products from './Products';
import Cart from './Cart';
import StoreLayout from './StoreLayout';

const Stores = () => {
  const location = useLocation();
  return (
    <Routes>
         
         <Route path="/:store_slug/" element={<StoreLayout/>}>
         <Route index element={<Products/>}/>
         <Route path="cart/" element={<Cart/>}/>
 
         <Route path="login/" element={<LoginReguired><Navigate  to={location.pathname.replace(/\/login\//, '/')} /></LoginReguired>}/>

        <Route path="about-us/" element={<AboutUs/>}/>
        <Route path="contact-us/" element={<ContactUs/>}/>
        <Route path="change-password/" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
        <Route path="profile/" element={<LoginReguired><Profile/></LoginReguired>}/>
        </Route>
    </Routes>
  )
}

export default Stores;
