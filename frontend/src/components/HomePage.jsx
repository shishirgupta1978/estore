import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Spinner, Title,ProductCard } from ".";
import { MyContext, axiosApi } from "../utility";
import { Container, Row, Col } from "react-bootstrap";


export const HomePage = () => {
  const { context, setContext,search } = useContext(MyContext);

  const [categoryid, setCategoryid] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [websites, setWebsites] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  
  const [ cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :{});

	useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`store/websites/`, config, setWebsites, setContext);

}, []);




  return (
    <>
    {websites.is_loading && <Spinner />}
    <div className="dashboard">
        
        <Container>
          <Row sm={12} md={3}>{websites.is_success && websites.result && websites.result.filter((website) => website.website_name.toLowerCase().includes(search.toLowerCase())).map((website) => <Col key={website.id} className="mb-2"><NavLink to={`/store/${website.website_name}/`}>{website.website_name}</NavLink></Col>)}</Row>
        </Container>
      </div>
    </>
  )
}
