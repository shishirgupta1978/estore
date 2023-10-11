import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../utility";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {Spinner} from ".";
import { Input } from ".";
export const WebsiteProfile = () => {
  


  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);

	const [formData, setFormData] = useState({
		logo_img_url: '',
		brand_name: '',
		contact:'',
		about:'',
		footnote:''
		
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	

	const navigate = useNavigate();
	useEffect(()=>{
		if(data.is_success)
		{
			toast.success("Record update successfully.")
			setLoadData({...data})
		}
		else{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`api/userprofile/get-user-profile/`, config, setLoadData, setContext);
		}
		
	},[data.is_success])


	useEffect(()=>{
		if(loadData.is_success)
		{
			setFormData({...formData, logo_img_url:loadData.result.logo_img_url ? loadData.result.logo_img_url:'' ,brand_name:loadData.result.brand_name ? loadData.result.brand_name : '',contact:loadData.result.contact ? loadData.result.contact_no : '',about:loadData.result.about ? loadData.result.about : '',footnote:loadData.result.footnote ? loadData.result.footnote : ''});
		}
	},[loadData])




	const submitHandler = (e) => {
		e.preventDefault();
			const config = { method: "put", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/update/`, config, setData,setContext);
		};	

  return (
	<div className="form-container">
	{loadData.is_loading && <Spinner />}
	
	{loadData.is_success && <>
			<section className="form">
			
							<h2> Update Profile</h2>
						<form onSubmit={submitHandler}>
				<Input  label='Logo Image Url' type='text' name='logo_img_url' value={formData.logo_img_url} onChange={handleChange}/>
				<Input  label='Brand Name' type='text' name='brand_name' value={formData.brand_name} onChange={handleChange}/>
				<div className="material-input">
				<label>Contact Information</label>
		      <div className="input-container"><textarea name='contact' value={formData.contact} rows="3" onChange={handleChange}/></div></div>
			  <div className="material-input">
				<label>About Information</label>
		      <div className="input-container"><textarea name='about' value={formData.about} rows="3" onChange={handleChange}/></div></div>
				<Input  label='Footnote Text' type='text' name='footnote' value={formData.footnote} onChange={handleChange}/>
					<Button type="submit" className="my-2" variant="dark">Update</Button>
						</form>
			</section></>}
		</div>


  )
}

