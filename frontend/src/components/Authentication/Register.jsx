import React,{useContext, useState,useEffect} from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { axiosApi,MyContext } from '../../utility';
import {FloatingLabel,Form} from 'react-bootstrap';

export const Register = () => {
  const {setPage} =useContext(MyContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);
	

	const [formData, setFormData] = useState({email: '', password: '', password_confirm: ''});


	const navigate = useNavigate();


	useEffect(() => {
		if(data.is_success)
		{
			toast.success("User Regeister Successfully.")
			setFormData({email: '',	password: '',	password_confirm: '' });
		}
		
	}, [data.is_success]);

	const handleRegister = (e) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			toast.error("Passwords do not match");
		} else {
			
			const config = { method: "post", headers: { "Content-Type": "application/json", "Authorization": true }, data:{email: email, password: password, password_confirm: passwordConfirm} }
			axiosApi(`account/auth/`, config, setData,setContext);
	
		}
	};


    
  return (
    <div className="form mt-2">
      <h2>Register</h2>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" ><Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3"><Form.Control type="password" placeholder="Password"   value={password} onChange={(e) => setPassword(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3"><Form.Control type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} /></FloatingLabel>
      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink onClick={()=>{setPage("Login")}}>click here.</NavLink></p>
    </div>
  )
}
