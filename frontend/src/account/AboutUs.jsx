import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Context  from "../context";
import { Button, Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";

const AboutUs = () => {
  
    const location = useLocation();
    const [store_slug,setStore_slug]=useState(null)
    const {axiosApi,Loading  } = useContext(Context);
    const navigate = useNavigate();
    const [loadData, setLoadData] = useState({ 'status': null, 'result': null, 'message': null })
    

    useEffect(() => {
      const regex = /\/store\/([^/]+)/i; 
      const match =location.pathname.match(regex);
      if (match) {
        setStore_slug(match[1].toLowerCase());
        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`store/get-website/${match[1].toLowerCase()}/`, config, setLoadData);
  
      } else{
        setStore_slug(null);
      }
    
  
  
  
  }, [location.pathname]);
  



  return (
    <Container className='mt-2'>
       
        
      <Row>
        <Col>
          <h2>About Our Company</h2>
          <Loading loadData={loadData}>
          <pre>{loadData.result?.description }</pre> 
          </Loading>
        </Col>
      
      </Row> 
    </Container>
  );
};

export default AboutUs;