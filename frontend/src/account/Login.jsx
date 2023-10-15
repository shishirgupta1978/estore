import React, { useEffect, useState,useContext } from "react";
import jwt_decode from "jwt-decode";
import { FaSignInAlt } from "react-icons/fa";
import { NavLink,Link, useNavigate } from "react-router-dom";
import {  useParams,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context";
import {FloatingLabel,Form,Row,Col,Button,Spinner} from 'react-bootstrap';

const Login=()=> {
  const { store_slug } = useParams();
  const [email, setEmail] = useState(localStorage.getItem("email") ? localStorage.getItem("email") :'');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(localStorage.getItem("email") ? true :false);
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const {user,setUser,setPage,axiosApi } = useContext(Context);


	const handleCheckboxChange = (event) => {
	  setIsChecked(event.target.checked);
	};

 const location = useLocation(); 	
 const { from } = location.state || {};
 const navigate = useNavigate();


	useEffect(() => {
		if(data.is_success )
		{
			localStorage.setItem("Tokens",JSON.stringify(data.result));
     	    setUser(jwt_decode(data.result.access));

		}
	
	}, [data,user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if(isChecked)
		{
			localStorage.setItem("email",email.toLowerCase())
		}
		else{
			localStorage.removeItem("email")
		}
		const config = { method: "post", headers: { "Content-Type": "application/json" }, data:{'email' : email, 'password': password} }
		axiosApi(`account/tokens/`, config, setData);
	};


  


  return (
    <>
    {data.is_loading && <Spinner />}
    <Form  className="form mt-2" onSubmit={submitHandler}>
      <h2>Login</h2>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" ><Form.Control type="email" placeholder="name@example.com" value={email} required onChange={(e) => setEmail(e.target.value)} /></FloatingLabel>
      <FloatingLabel  label="Password" className="mb-3"><Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/></FloatingLabel>        
      <Row><Col><Form.Group className="mb-3" controlId="formBasicCheckbox"> <Form.Check type="checkbox" label="Remember me" checked={isChecked} onChange={handleCheckboxChange} /></Form.Group></Col><Col> <NavLink onClick={()=>{setPage("ForgetPassword")} }> Forget password?</NavLink></Col></Row>
      <Button variant="dark" type="submit" className="my-2">Login</Button>
      <p style={{textAlign:'left'}}>Don't have an account? <NavLink onClick={()=>{setPage("Register")}} >click here.</NavLink></p>
      </Form>
    </>
  );
}

export default Login;