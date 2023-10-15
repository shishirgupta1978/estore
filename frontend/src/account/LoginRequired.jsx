import React, { useEffect,useContext } from 'react';
import { useLocation, Navigate,useParams } from 'react-router-dom';
import  Context  from '../context';
import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';

const LoginReguired = props => {
  let location = useLocation();
  const { store_slug } = useParams();

  const { user,page } = useContext(Context);
    if (!user) {
    return <>
    {page=="Login" && <Login/>}
    {page=="ForgetPassword" && <ForgetPassword/>}
    {page=="Register" && <Register/>}
   
    </>;

  }

  return props.children;
}

export default LoginReguired;