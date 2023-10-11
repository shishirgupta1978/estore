import {PiToggleRightFill,PiToggleLeftFill} from 'react-icons/pi'
import React,{useState,useEffect,useContext} from 'react'
import { NavLink } from 'react-router-dom';
import { axiosApi,MyContext } from '../utility';
import { toast } from 'react-toastify';
import { Input } from '.';


export const Sidebar = () => {
  const { context,setContext } = useContext(MyContext);
	const [source, setSource] = useState(null);

  const [isOpen,setIsOpen]=useState(true);
  const toggle =()=>{
    setIsOpen(!isOpen);
  }

  


   
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      
      <button className="toggle-button" onClick={toggle}>
        {isOpen ?        <PiToggleRightFill />:<PiToggleLeftFill   />}
      </button>

      <div className="sidebar-menu">
		{/*	<NavLink to="/dashboard/utility">Utility</NavLink>
      <NavLink to="/dashboard/task2">Task2</NavLink>*/}
      <NavLink to="/create-website">Profile</NavLink>
      <NavLink to="/create-website/update-categories">Categories</NavLink>
      <NavLink to="/create-website/update-products">Products</NavLink>
      </div>
           
    </div>
  );
};

