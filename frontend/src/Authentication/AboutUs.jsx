import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from "..";
import { useLocation } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../../utility";
import { Button, Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "..";

export const AboutUs = () => {
  
    const location = useLocation();
    const [store_slug,setStore_slug]=useState(null)
    const {category,setCategory, context, setContext, search, setSearch,setBanners,setProducts } = useContext(MyContext);
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    

    useEffect(() => {
      const regex = /\/store\/([^/]+)/i; 
      const match =location.pathname.match(regex);
      if (match) {
        setStore_slug(match[1].toLowerCase());
        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config, setAboutUs, setContext);
  
      } else{
        setStore_slug(null);
      }
    
  
  
  
  }, [location.pathname]);
  



  return (
    <Container className='mt-2'>
       
        
      <Row>
        <Col>
          <h2>About Our Company</h2>
          
          {aboutUs.is_success && aboutUs.result && <pre>{aboutUs.result.description }          </pre>}
        </Col>
      
      </Row> 
    </Container>
  );
};

