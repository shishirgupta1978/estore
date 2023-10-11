import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useParams } from 'react-router-dom'
import {Routes,Route,Navigate} from 'react-router-dom'
import {ProductProfile,CategoryProfile, StoreProfile,HomePage, UpdateProfile,ChangePassword ,ResetPassword, CreateWebsite,Cart,Products,Contact,AboutUs } from './components'
import { ToastContainer } from "react-toastify";
import  Header  from './components/Header'
import { Footer } from './components'
import { LoginReguired } from './components/Authentication/LoginRequired'

export const Urls=()=> {

  return (
    <>
     
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login/" element={<LoginReguired><Navigate to="/"/></LoginReguired>}/>
        <Route path="/create-website" element={<LoginReguired><CreateWebsite/></LoginReguired>}/>
        <Route path="/contact/"  element={<Contact/>}/>
        <Route path="/aboutus/" element={<AboutUs/>}/>
        <Route path="create-website/:store_id/" element={<LoginReguired><CategoryProfile/></LoginReguired>}/> 
        <Route path="create-website/:store_id/:category_id/" element={<LoginReguired><ProductProfile/></LoginReguired>}/>  
        <Route path="changepassword" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
        <Route path="/store/:store_slug/" element={<Products/>}/>
        <Route path="/store/:store_slug/login/" element={<LoginReguired><Navigate  to={`/store/${useParams().store_slug}`} /></LoginReguired>}/>
        <Route path="/store/:store_slug/cart/" element={<LoginReguired><Cart/></LoginReguired>}/>
        <Route path="changepassword" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
        <Route path="/store/:store_slug/aboutus/" element={<AboutUs/>}/>
        <Route path="/store/:store_slug/contact/" element={<Contact/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="profile" element={<LoginReguired><UpdateProfile/></LoginReguired>}/>
       </Routes>
       <Footer/>
      <ToastContainer theme="dark" />
    </>
  )
}

