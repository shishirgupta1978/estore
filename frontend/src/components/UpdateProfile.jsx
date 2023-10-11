import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BASE_URL,MyContext,axiosApi } from "../utility";
import { toast } from "react-toastify";
import {Spinner,Title} from ".";
import { Input } from ".";
import { NoProfileImg } from "../assets/images";
export const UpdateProfile = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [profileUrl, setProfileUrl] = useState(null);
	const [documentUrl, setDocumentUrl] = useState(null);
	const [selectedDocument, setSelectedDocument]=useState(null);

	const handleImageClick = () => {
	  fileInputRef.current.click();
	};
  
	const handleFileChange = (event) => {
	  const file = event.target.files[0];

	  setSelectedImage(file);
	  setProfileUrl(URL.createObjectURL(event.target.files[0]))


	  
	};

	const handleDocumentChange = (event) => {
		const document = event.target.files[0];
  
		setSelectedDocument(document);
		
  
  
		
	  };
  
	const fileInputRef = React.createRef();


  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		
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
			navigate("/")
		}
		

		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		if(!loadData.is_success)
		{
			axiosApi(`account/auth/`, config, setLoadData, setContext);
		}
		else{
			
			setFormData({...formData, first_name:loadData.result.first_name ? loadData.result.first_name:'' ,last_name:loadData.result.last_name ? loadData.result.last_name : ''});

			setDocumentUrl(loadData.result.documents_url ?  BASE_URL+ loadData.result.documents_url : null);
		    setProfileUrl(loadData.result.profile_pic_url ? BASE_URL+ loadData.result.profile_pic_url : null);

			


		}
		
	


	},[loadData.is_success,data.is_success])

	const submitHandler = (e) => {
		e.preventDefault();
		const myformData = new FormData();
		if(selectedDocument)
		{
			myformData.append("documents", selectedDocument);
		}
		if(selectedImage)
		{
			myformData.append("profile_pic", selectedImage);

		}
			myformData.append("first_name", formData.first_name);
			myformData.append("last_name", formData.last_name);

			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:myformData }
			axiosApi(`account/auth/`, config, setData,setContext);
		

		
    	

	};	

  return (
	<div >
	{loadData.is_loading && <Spinner />}
	
	{loadData.is_success && <>
			<section className="form mt-2">
			
							<h2> Update Profile</h2>
						<form onSubmit={submitHandler}>

						<img
        src={profileUrl ?  profileUrl : NoProfileImg}
        alt="Click to Upload"
        onClick={handleImageClick}
		width="80px" height="80px" className="mb-3" style={{margin:'auto',borderRadius: '50%', display :'block',cursor: 'pointer'}}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    



							
							<Input  label='First Name' type='text' name='first_name' value={formData.first_name} onChange={handleChange}/>
							<Input  label='Last Name' type='text' name='last_name' value={formData.last_name} onChange={handleChange}/>
							{documentUrl ? <a href={documentUrl}>Download</a> :""}
							<Input label="Update Documents" style={{marginTop:'5px'}} type='file' name='documents' accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" onChange={handleDocumentChange}/>	
							<Button type="submit" variant="dark" className="mt-2">Update</Button>
						</form>
			</section></>}
		</div>


  )
}

