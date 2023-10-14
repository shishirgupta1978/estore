import React, { useEffect, useState,useContext } from "react";
import { FaUser } from "react-icons/fa";
import Context from "../context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Button,FloatingLabel,Form,Row,Col} from 'react-bootstrap';

const ChangePassword = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext,axiosApi } = useContext(Context);
	

	const [formData, setFormData] = useState({
		old_password: '',
		password: '',
		password_confirm: ''
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
			setFormData({
				old_password: '',
				password: '',
				password_confirm: ''
			  });
		}
		
	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.password !== formData.password_confirm) {
			toast.error("Passwords do not match");
		} else {
			
			const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true }, data:formData }
			axiosApi(`account/change-password/`, config, setData,setContext);
	
		}
	};
	return (
			<Form className="form mt-2" onSubmit={submitHandler}>				
				<h2>Change Password</h2>
				{data.is_loading && <Spinner />}
				<FloatingLabel controlId="floatingInput1" label="Current Password" className="mb-3" ><Form.Control type="password" value={formData.old_password} placeholder="Old Password" onChange={handleChange} name="old_password"/></FloatingLabel>
				<FloatingLabel controlId="floatingInput2" label="New Password" className="mb-3" ><Form.Control type="password" value={formData.password} placeholder="New Password" onChange={handleChange}  name="password" /></FloatingLabel>
				<FloatingLabel controlId="floatingInput3" label="Confirm Password" className="mb-3" ><Form.Control type="password" value={formData.password_confirm} placeholder="Confirm Password" onChange={handleChange}  name="password_confirm"/></FloatingLabel>
				<Button variant="dark" className="mt-2"	type="submit">Update</Button>
			</Form>
	);
};

export default ChangePassword;