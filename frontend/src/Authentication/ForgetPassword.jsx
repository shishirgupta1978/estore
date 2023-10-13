// Login.js
import React, { useContext, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {MyContext,axiosApi} from "../../utility";
import {FloatingLabel,Form} from 'react-bootstrap';


export const ForgetPassword=()=> {
  const [Email, setEmail] = useState('');
  const { website } = useParams();
  const {setPage} =useContext(MyContext);
  const handleEmail = () => {
    // Add your login logic here
  };

  return (
    <div className="form mt-2">
      <h2>Forget Password</h2>
      <FloatingLabel controlId="floatingInput" label="Email address"  className="mb-3"><Form.Control type="email" placeholder="name@example.com" value={Email} onChange={(e) => setEmail(e.target.value)} /> </FloatingLabel>
			<Button variant="dark" type="submit" onClick={handleEmail}>Send Email </Button>
      <p style={{textAlign:'left'}}>Back to <NavLink onClick={()=>{setPage("Login")}}>Login Page</NavLink></p>
    </div>
  );
}

