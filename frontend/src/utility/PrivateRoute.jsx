import React, { useEffect,useContext } from 'react';
import { useLocation, Navigate,useParams } from 'react-router-dom';
import { MyContext } from '.';
import { Login,ForgetPassword,Register } from '../components';

export const PrivateRoute = props => {
  let location = useLocation();
  const { website } = useParams();

  const { context,page } = useContext(MyContext);
    if (!context.user) {
    return <>
    {page}
    {page=="Login" && <Login/>}
    {page=="ForgetPassword" && <ForgetPassword/>}
    {page=="Register" && <Register/>}
   
    </>;

  }

  return props.children;
}

