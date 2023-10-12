import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from "..";
import { useLocation } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../../utility";
import {FloatingLabel,Form, Button, Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
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
	const [sendData, setSendData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })

  

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
		if(sendData.is_success)
		{
			toast.success("Mail send successfully.")
			setFormData({ name: '', mobile_no:'', email:'', subject:'', message:'',receiver :'abc@gmail.com'})
            setData({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
		}
		
	},[sendData.is_success])






	const submitHandler = (e) => {
		e.preventDefault();
			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data' }, data:formData }
			axiosApi(`account/send-enquiry-email/`, config, setData,setContext);
		};	

  return (



    <Container className="mt-2">
        <Row>
		<Col>
	
			<Form className="form" onSubmit={submitHandler}>
				<h2> Contact us</h2>
				<FloatingLabel controlId="floatingInput" label="Name" className="mb-3" ><Form.Control type="text" value={formData.name} placeholder="Name" onChange={handleChange} name="name" required/></FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="Mobile No." className="mb-3" ><Form.Control type="number" value={formData.mobile_no} placeholder="Mobile No." onChange={handleChange} name="mobile_no" required/></FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="Email" className="mb-3" ><Form.Control type="email" value={formData.email} placeholder="Email" onChange={handleChange} name="email" required/></FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="Subject" className="mb-3" ><Form.Control type="text" value={formData.subject} placeholder="Subject" onChange={handleChange} name="subject" required/></FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="Message" className="mb-3" ><Form.Control as="textarea" placeholder="Leave a comment here" name='message' value={formData.message} rows="3" onChange={handleChange} required  /></FloatingLabel>
				<Button type="submit" className="my-2" variant="dark">Send Mail</Button>
     		</Form>
	
        </Col>
		<Col>        { contact.is_success && contact.result && <pre>{contact.result.contact ? contact.result.contact :"" }</pre>} 
</Col>
        </Row>
        </Container>

  )
}

