import React, { useEffect, useState,useContext } from "react";
import { FaUser } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from ".";
import { axiosApi,MyContext } from "../utility";

export const ResetPassword = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const { uid, token } = useParams();
	const { context,setContext } = useContext(MyContext);
	const [formData, setFormData] = useState({
		uid:uid,
        token:token,
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
			toast.success("Your password has been successfully changed.")
			navigate("/login")
		}

		
	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.new_password !== formData.re_new_password) {
			toast.error("Passwords do not match");
		} else {
		
			const config = { method: "post", headers: { "Content-Type": "application/json" }, data:formData }
			axiosApi(`api/auth/users/reset_password_confirm/`, config, setData, setContext);

		}


	};
	return (
		<div className="form-container">
			<div className="form mt-2">				
					
							<h2 className="text-center">
								 Reset Password
							</h2>
	
				{data.is_loading && <Spinner />}
						<form onSubmit={submitHandler}>
			

						<Input  label='New Password' type='password' name='new_password' value={formData.new_password} onChange={handleChange} className="mb-3" required/>
							<Input  label='Confirm New Password' type='password' name='re_new_password' value={formData.re_new_password} onChange={handleChange}  className="mb-3" required/>

							
							<button	type="submit">Update</button>
						</form>
				
			</div>
		</div>
	);
};

