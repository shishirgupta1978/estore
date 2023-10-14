import React,{useEffect,useContext, useState} from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Categories } from './Categories';
import { Footer } from './Footer';
import { Header } from './Header';
import "../../assets/styles/Dashboard.scss";
export const Dashboard = () => {
  const navigate = useNavigate();
  const { context} = useContext(MyContext);
  const [categories,setCategories] = useState([]);
  


  useEffect(() => {

	}, []);

  return (
    <>
    <Header/>
    <div className='dashboard'>
      <div className='left'>
          <Categories categories={categories} />
      </div>
    <div className="right" >
     <Outlet/>
    </div>
    </div>
    <Footer footnote={footnote}/>
    </>
)
}

