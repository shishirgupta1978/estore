import React,{useEffect,useContext} from 'react'
import { Outlet } from 'react-router-dom';
import { MyContext } from '../utility';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
export const CreateWebsite = () => {
  const navigate = useNavigate();
  const { context} = useContext(MyContext);
  


  useEffect(() => {
		if(!context.user)
		{
			navigate("/");
		}

	}, [context.user]);

  return (
    <>
    <div className='dashboard'>
      <div className='left'>
      <Sidebar />
      </div>
    
    <div className="right" >
     <Outlet/>

      

    </div>
    </div>
    
    </>
)
}

