import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import {LoginReguired,ChangePassword,Profile} from '../account';
import { AboutUs,ContactUs } from '../pages';
import { useLocation } from 'react-router-dom';
import StoreProfile from './StoreProfile';
import CategoryProfile from './CategoryProfile';
import BannerProfile from './BannerProfile';
import ProductProfile  from './ProductProfile';
import Products from './Products';
import Cart from './Cart';

const Stores = () => {
  const location = useLocation();
  return (
    <Routes>
         <Route path="create/" element={<LoginReguired><StoreProfile/></LoginReguired>}/> 
         <Route path="categories/create/:store_id/" element={<LoginReguired><CategoryProfile/></LoginReguired>}/>
         <Route path="banners/create/:store_id/" element={<LoginReguired><BannerProfile/></LoginReguired>}/>
         <Route path="products/create/:store_id/:category_id/" element={<LoginReguired><ProductProfile/></LoginReguired>}/>
         <Route path="store/:store_slug/" element={<Products/>}/>
         <Route path="store/:store_slug/cart/" element={<Cart/>}/>
 
         <Route path="store/:store_slug/login/" element={<LoginReguired><Navigate  to={location.pathname.replace(/\/login\//, '/')} /></LoginReguired>}/>

        <Route path="store/:store_slug/about-us/" element={<AboutUs/>}/>
        <Route path="store/:store_slug/contact-us/" element={<ContactUs/>}/>
        <Route path="store/:store_slug/change-password/" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
        <Route path="store/:store_slug/profile/" element={<LoginReguired><Profile/></LoginReguired>}/>



         {/* 
           
        
        
  */}
    </Routes>
  )
}

export default Stores;
