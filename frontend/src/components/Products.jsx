import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Title,ProductCard } from ".";
import { MyContext, axiosApi } from "../utility";
import { Container, Row, Col } from "react-bootstrap";
import { WebsiteCarousel } from ".";


export const Products = () => {
  const { context, setContext,search,products,category } = useContext(MyContext);
  
  const navigate = useNavigate();

  


  return (
    <>
 <WebsiteCarousel/>
       <Container className="mt-2">
          <Row>{products && products.length > 0 && products.filter((product)=>{return product.category==category.name || category.id==0 }).filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => <Col sm={12} md={6} lg={4} key={product.id} className="mb-2"><ProductCard product={product} /></Col>)}</Row>
        </Container>
     </>
    
  )
}
