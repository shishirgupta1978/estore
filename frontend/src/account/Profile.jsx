import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel,Form,Button,Spinner } from "react-bootstrap";
import Context from "../context";
import { toast } from "react-toastify";
import { NoProfileImg } from "../assets/images";
const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [profileUrl, setProfileUrl] = useState(null);
	const [documentUrl, setDocumentUrl] = useState(null);
	const [selectedDocument, setSelectedDocument]=useState(null);
	const [method,setMethod]=useState(null)
	const [id,setId]=useState(null)

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


  
	const [loadData, setLoadData] =  useState({ 'status':null, 'result': null, 'message': null })
	const [data, setData] =  useState({ 'status':null, 'result': null, 'message': null })
	const {BASE_URL,axiosApi,Loading} = useContext(Context);

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
		if(data.status == 'success')
		{
			toast.success("Save Successfull.")
		}

		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`account/profile/`, config, setLoadData);

	},[data])


	useEffect(()=>{
		if(loadData.status == 'success')
{
			
			setFormData({...formData, first_name:loadData.result.length ==1 && loadData.result[0].first_name ? loadData.result[0].first_name:'' ,last_name:loadData.result.length ==1 && loadData.result[0].last_name ? loadData.result[0].last_name : ''});
			setMethod(loadData.result.length == 1 ? "put" : "post")
			if(loadData.result.length == 1)
			{
				setId(loadData.result[0].id)
			}

			setDocumentUrl(loadData.result.length ==1 && loadData.result[0].documents_url ?  BASE_URL+ loadData.result[0].documents_url : null);
		    setProfileUrl(loadData.result.length ==1 && loadData.result[0].profile_pic_url ? BASE_URL+ loadData.result[0].profile_pic_url : null);

			


		}
		
	
	},[loadData])

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
			const config = { method:method, headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:myformData }
			if(method =="post")
			{
				axiosApi(`account/profile/`, config, setData);
			}
			
			if(method =="put")
			{
				axiosApi(`account/profile/${id}/`, config, setData);
			}


   	

	};	

  return (
	<div >
<Loading loadData={loadData}>
	
	{loadData.status == 'success' && <>
			<Form className="form mt-2" onSubmit={submitHandler}>
			
							<h2> {loadData.result.length == 0 ? "Add" : "Update"  }Profile</h2>

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
    


	<FloatingLabel  label="First Name" className="mb-3" ><Form.Control  placeholder="First Name" type='text' name='first_name' value={formData.first_name} onChange={handleChange}/></FloatingLabel>
	<FloatingLabel  label="Last Name" className="mb-3" ><Form.Control placeholder="Last Name" type='text' name='last_name' value={formData.last_name} onChange={handleChange}/></FloatingLabel>

							
							{documentUrl ? <a href={documentUrl}>Download</a> :""}
							<FloatingLabel controlId="floatingInput" label="Update Documents" className="mb-3" ><Form.Control placeholder="Select Document" type='file' name='documents' accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed" onChange={handleDocumentChange}/></FloatingLabel>
			
							<Button type="submit" variant="dark" className="mt-2">{loadData.result.length == 0 ? "Add" : "Update"  }</Button>
				
			</Form></>}
			</Loading>
		</div>


  )
}

export default Profile;