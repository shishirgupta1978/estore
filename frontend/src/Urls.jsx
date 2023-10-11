import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Routes,Route,Navigate} from 'react-router-dom'
import {ProductProfile,CategoryProfile, StoreProfile, Login, Register, ActivateUser,HomePage,ForgetPassword, UpdateProfile,LogViewer,Utility,ChangePassword ,ResetPassword, CreateWebsite,WebsiteProfile,Cart,Products,Website,Contact,AboutUs } from './components'
import { ToastContainer } from "react-toastify";
import { Header,Footer } from './components'
import { PrivateRoute } from './utility'

export const Urls=()=> {

  return (
    <>

      
      <Header/>
      <Routes>
        
        <Route path="/" element={<HomePage />}/>
        <Route path="/home/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
        <Route path="/create-website" element={<PrivateRoute><CreateWebsite/></PrivateRoute>}/>
        <Route path="create-website" element={<PrivateRoute><StoreProfile/></PrivateRoute>}/>
        <Route path="create-website/:store_id/" element={<PrivateRoute><CategoryProfile/></PrivateRoute>}/> 
        <Route path="create-website/:store_id/:category_id/" element={<PrivateRoute><ProductProfile/></PrivateRoute>}/>  
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="changepassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
        
        
        <Route path="/store/:store_slug/" element={<Products/>}/>
        <Route path="/store/:store_slug/home/" element={<PrivateRoute><Products/></PrivateRoute>}/>
        <Route path="/store/:store_slug/cart/" element={<PrivateRoute><Cart/></PrivateRoute>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="changepassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
 
        <Route path="/store/:store_slug/aboutus/" element={<AboutUs/>}/>
        <Route path="/store/:store_slug/contact/" element={<Contact/>}/>
        <Route path="activate/:uid/:token" element={<ActivateUser/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
        <Route path="profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
       
        
        
      



       </Routes>
       <Footer/>
      <ToastContainer theme="dark" />
    </>
  )
}

