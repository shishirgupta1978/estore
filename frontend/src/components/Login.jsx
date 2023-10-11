import React, { useEffect, useState,useContext } from "react";
import jwt_decode from "jwt-decode";
import { Input } from ".";
import { Button } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { NavLink,Link, useNavigate } from "react-router-dom";
import {  useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { toast } from "react-toastify";
import {Spinner,Title} from ".";
import {MyContext,axiosApi} from "../utility";

export const Login=()=> {
  const { store_slug } = useParams();
  const [email, setEmail] = useState(localStorage.getItem("email") ? localStorage.getItem("email") :'');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(localStorage.getItem("email") ? true :false);
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const {context,setContext,setPage } = useContext(MyContext);

	const handleCheckboxChange = (event) => {
	  setIsChecked(event.target.checked);
	};

 const location = useLocation(); 	
 const { from } = location.state || {};
 const navigate = useNavigate();


	useEffect(() => {
		if(data.is_success )
		{
			localStorage.setItem("Tokens",JSON.stringify(data.result));
     	    setContext({...context,user:jwt_decode(data.result.access)});

		}
	
	}, [data,context.user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if(isChecked)
		{
			localStorage.setItem("email",email.toLowerCase())
		}
		else{
			localStorage.removeItem("email")
		}


		const config = { method: "post", headers: { "Content-Type": "application/json" }, data:{'email' : email, 'password': password} }
		axiosApi(`account/tokens/`, config, setData, setContext);
	
	};


  


  return (
    <>
    {data.is_loading && <Spinner />}
    <div className="form mt-2">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
      
      <Input
        label="Email Address"
        type="email"
        
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className='row'><div className='column'><input type="checkbox" style={{width:'30px'}} checked={isChecked} onChange={handleCheckboxChange} /> Remember me</div><div className='column'>         <NavLink onClick={()=>{setPage("ForgetPassword")} }> Forget password?</NavLink></div></div>

      <div className='row'><div className='column'><Button variant="dark" type="submit">Login</Button></div></div>
      </form>
      <p style={{textAlign:'left'}}>Don't have an account? <NavLink onClick={()=>{setPage("Register")}} >click here.</NavLink></p>
    </div></>
  );
}

