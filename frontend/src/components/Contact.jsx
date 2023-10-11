import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from ".";
import { useLocation } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../utility";
import { Button, Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from ".";
export const Contact = () => {
  
    const location = useLocation();
    const [store_slug,setStore_slug]=useState(null)
    const {category,setCategory, context, setContext, search, setSearch,setBanners,setProducts } = useContext(MyContext);
    const navigate = useNavigate();
    const [contact, setContact] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    

    useEffect(() => {
      const regex = /\/store\/([^/]+)/i; 
      const match =location.pathname.match(regex);
      if (match) {
        setStore_slug(match[1].toLowerCase());
        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config, setContact, setContext);
  
      } else{
        setStore_slug(null);
      }
    
  
  
  
  }, [location.pathname]);
  


    
	const { website } = useContext(MyContext);
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })

  

	const [formData, setFormData] = useState({
		
		name: '',
        mobile_no:'',
        email_id:'',
        subject:'',
		message:''
		
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	

	useEffect(()=>{
		if(data.is_success)
		{
			toast.success("Mail send update successfully.")
			setFormData({ name: '', mobile_no:'', email:'', subject:'', message:''})
            setData({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
		}
		
	},[data.is_success])






	const submitHandler = (e) => {
		e.preventDefault();
			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/send-mail/`, config, setData,setContext);
		};	

  return (



    <Container className="mt-2">
        <Row><Col>
	<div className="form-container">
	
	
			<section className="form">
			
							<h2> Contact us</h2>
						<form onSubmit={submitHandler}>
                        <Input  label='Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
                        <Input  label='Mobile No' type='text' name='mobile_no' value={formData.mobile_no} onChange={handleChange}  required/>
				<Input  label='Email' type='email' name='email' value={formData.email_id} onChange={handleChange}  required/>
				
				<Input  label='Subject' type='text' name='subject' value={formData.subject} onChange={handleChange}  required/>
                <div className="material-input">
				<label>Message</label>
				
		      <div className="input-container"><textarea name='message' value={formData.message} rows="3" onChange={handleChange} required/></div></div>


					<Button type="submit" className="my-2" variant="dark">Send Mail</Button>
						</form>
			</section>
		</div>
        </Col><Col>        { contact.is_success && contact.result && <pre>{contact.result.contact ? contact.result.contact :"" }</pre>} 
</Col>
        </Row>
        </Container>

  )
}

