import React, { useEffect, useState,useContext } from "react";
import { FaUser } from "react-icons/fa";
import { Input } from ".";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from ".";
import { Button } from "react-bootstrap";
import { axiosApi,MyContext } from "../utility";

export const ChangePassword = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);
	

	const [formData, setFormData] = useState({
		current_password: '',
		new_password: '',
		re_new_password: ''
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };

	const navigate = useNavigate();


	useEffect(() => {
		if(data.is_success)
		{
			toast.success("Password Changed Successfully.")
			navigate("/")
		}
		
	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.new_password !== formData.re_new_password) {
			toast.error("Passwords do not match");
		} else {
			
			const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true }, data:formData }
			axiosApi(`api/auth/users/set_password/`, config, setData,setContext);
	
		}
	};
	return (
			<section className="form mt-2">				
					
							<h2>Change Password</h2>
	
				{data.is_loading && <Spinner />}
						<form onSubmit={submitHandler}>
						<Input  label='Current Password' type='password' name='current_password' value={formData.current_password} onChange={handleChange} required/>

						<Input  label='New Password' type='password' name='new_password' value={formData.new_password} onChange={handleChange} required/>
							<Input  label='Confirm New Password' type='password' name='re_new_password' value={formData.re_new_password} onChange={handleChange}  required/>

							
							<Button variant="dark" className="mt-2"
								type="submit"
							>
								Update
							</Button>
						</form>

				
			</section>
	);
};

