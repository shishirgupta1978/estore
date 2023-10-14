import React from 'react'
import {Route,Routes,Navigate } from 'react-router-dom';
import LoginReguired from './LoginRequired';
import ChangePassword  from './ChangePassword';

import Profile from './Profile';


const Account = () => {
  return (
    <Routes>
    <Route path="login/" element={<LoginReguired><Navigate to="/"/></LoginReguired>}/>
    <Route path="change-password/" element={<LoginReguired><ChangePassword/></LoginReguired>}/>
    <Route path="profile/" element={<LoginReguired><Profile/></LoginReguired>}/>
        
{/*        

        <Route path="create-website/" element={<LoginReguired><CreateWebsite/></LoginReguired>}/>
        
        
  */}
    </Routes>
  )
}

export {LoginReguired,ChangePassword,Profile}
export default Account;
