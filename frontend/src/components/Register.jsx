import React,{useContext, useState} from 'react'
import { NavLink,useParams } from 'react-router-dom';
import { Input } from './Input';
import { Button } from 'react-bootstrap';
import { axiosApi,MyContext } from '../utility';

export const Register = () => {
    const [username, setUsername] = useState('');
    const { web_slug } = useParams();
    const {setPage} =useContext(MyContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const handleRegister = () => {
        // Add your login logic here
      };

  return (
    <div className="form mt-2">
      <h2>Register</h2>
      <Input
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="repassword"
        label="Confirm Password"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
      />

      <div className='row'><div className='column'>
      <Button variant="dark" type="submit" onClick={handleRegister}>Register</Button>
</div></div>
      <p style={{textAlign:'left'}}>Already have an account? <NavLink onClick={()=>{setPage("Login")}}>click here.</NavLink></p>
    </div>
  )
}
