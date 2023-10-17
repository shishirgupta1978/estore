import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Context from "../context";
import {FloatingLabel,Form, Button, Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
const ContactUs = () => {
  
    const location = useLocation();
    const [store_slug,setStore_slug]=useState(null)
    const {axiosApi,Loading } = useContext(Context);
    const navigate = useNavigate();
    const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
    

    useEffect(() => {
      const regex = /\/store\/([^/]+)/i; 
      const match =location.pathname.match(regex);
      if (match) {
        setStore_slug(match[1].toLowerCase());
        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config,setLoadData);
  
      } else{
        setStore_slug(null);
      }
    
  
  
  
  }, [location.pathname]);
  


    

	const [sendData, setSendData] = useState({ 'status': null, 'result': null, 'message': null })

  

	const [formData, setFormData] = useState({
		name: '',
        mobile_no:'',
        email:'',
        subject:'',
		message:'',
		receiver:'abc@gmail.com'
		
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	

	useEffect(()=>{
		if(sendData.status =='success')
		{
			toast.success("Mail send successfully.")
			setFormData({ name: '', mobile_no:'', email:'', subject:'', message:'',receiver :'abc@gmail.com'})
       
		}
		
	},[sendData])






	const submitHandler = (e) => {
		e.preventDefault();
			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data' }, data:formData }
			axiosApi(`account/send-enquiry-email/`, config, setSendData);
		};	

  return (



    <Container className="pt-2">
        <Row>
		<Col xs={12} md={6}>
	
			<Form className="form mb-3" onSubmit={submitHandler}>
				<h2> Contact us</h2>
				<FloatingLabel label="Name" className="mb-3" ><Form.Control type="text" value={formData.name} placeholder="Name" onChange={handleChange} name="name" required/></FloatingLabel>
				<FloatingLabel label="Mobile No." className="mb-3" ><Form.Control type="number" value={formData.mobile_no} placeholder="Mobile No." onChange={handleChange} name="mobile_no" required/></FloatingLabel>
				<FloatingLabel label="Email" className="mb-3" ><Form.Control type="email" value={formData.email} placeholder="Email" onChange={handleChange} name="email" required/></FloatingLabel>
				<FloatingLabel label="Subject" className="mb-3" ><Form.Control type="text" value={formData.subject} placeholder="Subject" onChange={handleChange} name="subject" required/></FloatingLabel>
				<FloatingLabel label="Message" className="mb-3" ><Form.Control as="textarea" placeholder="Leave a comment here" name='message' value={formData.message} rows="3" onChange={handleChange} required  /></FloatingLabel>
				<Button type="submit" className="my-2" variant="dark">Send Mail</Button>
     		</Form>
	
        </Col>
		<Col xs={12} md={6}>
			<Loading loadData={loadData}>

		
		        { loadData.status == 'success' && loadData.result && <>      <iframe
        title="Google Map"
        loading="lazy"
		height='450px'
		width='500px'
        allowfullscreen
        src={loadData.result.google_map_url}
      ></iframe>
<pre>{loadData.result.contact ? loadData.result.contact :"" }</pre></>} 
				</Loading>
</Col>
        </Row>
        </Container>

  )
}

export default ContactUs;