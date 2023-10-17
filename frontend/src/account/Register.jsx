import React,{useContext, useState,useEffect} from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom';
import Context from '../context';
import {Button,FloatingLabel,Form} from 'react-bootstrap';
import { toast } from "react-toastify";

const Register = () => {
  const {axiosApi,setPage} =useContext(Context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [data, setData] = useState({ 'status': null, 'result': null, 'message': null })
	
	



	const navigate = useNavigate();


	useEffect(() => {
		if(data.status == 'success')
		{
			toast.success("User Regeister Successfully.")
			setEmail('');
			setPassword('');
			setPasswordConfirm('');
		  
		}
		
	}, [data]);

	const handleRegister = (e) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			toast.error("Passwords do not match");
		} else {
			
			const config = { method: "post", headers: { "Content-Type": "application/json" }, data:{email: email, password: password, password_confirm: passwordConfirm} }
			axiosApi(`account/register/`, config, setData);
	
		}
	};


    
  return (
    <div className="form mt-2">
      <h2>Register</h2>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" ><Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword1" label="Password"  className="mb-3"><Form.Control type="password" placeholder="Password"   value={password} onChange={(e) => setPassword(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword2" label="Confirm Password" className="mb-3"><Form.Control type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} /></FloatingLabel>
      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink onClick={()=>{setPage("Login")}}>click here.</NavLink></p>
    </div>
  )
}
export default Register;