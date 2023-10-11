// Login.js
import React, { useContext, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import { Input } from './Input';
import { Button } from 'react-bootstrap';
import {MyContext,axiosApi} from "../utility";

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
      <Input
        type="email"
        label="Email Address"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
					<Button variant="dark" type="submit" onClick={handleEmail}>Send Email </Button>
      <p style={{textAlign:'left'}}>Back to <NavLink onClick={()=>{setPage("Login")}}>Login Page</NavLink></p>
    </div>
  );
}

