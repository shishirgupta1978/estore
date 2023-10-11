import React, { useEffect,useState,useContext } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {axiosApi,MyContext} from "../utility";
import {Spinner} from ".";

export const ActivateUser = () => {

  const { uid, token } = useParams();
	const { context,setContext } = useContext(MyContext);
	const navigate = useNavigate();
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

		if (data.is_success) {
			toast.success("Your account has been activated! You can login now");
			navigate("/login");
		}


	}, [data.is_success]);

	const submitHandler = () => {
		const userData = {
			uid,
			token,
		};

		const config = { method: "post", headers: { "Content-Type": "application/json" }, data:userData }
			axiosApi(`api/auth/users/activation/`, config, setData, setContext);
	
		
	};


  return (
    <div className="form">
    <h2>Activate Your Account</h2>
    {data.is_loading && <Spinner />}                  
    <button onClick={submitHandler}>Activate</button>
    <p style={{textAlign:'left'}}>Back to <NavLink to="/home/login">Login Page</NavLink></p>
  </div>

  )
}
