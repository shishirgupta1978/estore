import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import LoginReguired from './LoginRequired';
import ChangePassword  from './ChangePassword';
import HomePage from './HomePage';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs'
import Layout from './Layout';
import StoreProfile from '../stores/StoreProfile';
import CategoryProfile from '../stores/CategoryProfile';
import BannerProfile from '../stores/BannerProfile';
import ProductProfile from '../stores/ProductProfile';

import Profile from './Profile';


const Account = () => {
  return (
    <Routes>
    <Route path="/"  element={<Layout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="login/" element={<LoginReguired><Navigate to="/account-view"/></LoginReguired>}/>
    <Route path="change-password/" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
    <Route path="profile/" element={<LoginReguired><Profile/></LoginReguired>}/>
    <Route path="store-manage/" element={<LoginReguired><StoreProfile/></LoginReguired>}/> 
    <Route path="categories/manage/:store_id/" element={<LoginReguired><CategoryProfile/></LoginReguired>}/>
    <Route path="banners/manage/:store_id/" element={<LoginReguired><BannerProfile/></LoginReguired>}/>
    <Route path="products/manage/:store_id/:category_id/" element={<LoginReguired><ProductProfile/></LoginReguired>}/>
         
    </Route>
        
{/*        

        <Route path="create-website/" element={<LoginReguired><CreateWebsite/></LoginReguired>}/>
        
        
  */}
    </Routes>
  )
}

export {LoginReguired,ChangePassword,Profile,AboutUs,ContactUs}
export default Account;
