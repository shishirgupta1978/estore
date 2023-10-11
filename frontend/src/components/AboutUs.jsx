import React, { useEffect, useState,useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AboutUsImg } from '../assets/images';
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from ".";
import {MyContext,axiosApi} from "../utility";






export const AboutUs = () => {

	const { website} = useContext(MyContext);



  return (
    <Container className='mt-2'>
       
        
      <Row>
        <Col>
          <h2>About Our Company</h2>
          <pre>
          {website?.description=="" ? "Information not found.":website?.description }          </pre>
        </Col>
      
      </Row> 
    </Container>
  );
};

