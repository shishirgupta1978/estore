import React,{useContext, useState} from 'react'
import { NavLink,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { axiosApi,MyContext } from '../../utility';
import {FloatingLabel,Form} from 'react-bootstrap';

export const Register = () => {
    const {setPage} =useContext(MyContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const handleRegister = () => {
        
      };

  return (
    <div className="form mt-2">
      <h2>Register</h2>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" ><Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password"  className="mb-3"><Form.Control type="password" placeholder="Password"   value={password} onChange={(e) => setPassword(e.target.value)} /></FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3"><Form.Control type="password" placeholder="Confirm Password" value={repassword} onChange={(e) => setRepassword(e.target.value)} /></FloatingLabel>
      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink onClick={()=>{setPage("Login")}}>click here.</NavLink></p>
    </div>
  )
}
