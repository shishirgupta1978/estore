import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Context from "../context";
import {Spinner, Container, Row, Col } from "react-bootstrap";
import StoreCard from "../stores/StoreCard";

const HomePage = () => {
  const { context, setContext,search, axiosApi } = useContext(Context);

  const [websites, setWebsites] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  

	useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`store/websites/`, config, setWebsites, setContext);

}, []);




  return (
    <>
    {websites.is_loading && <Spinner />}
        <Container className="mt-3">
          <Row>{websites.is_success && websites.result && websites.result.filter((website) => website.store_name.toLowerCase().includes(search.toLowerCase())).map((website) => <Col  sm={12} md={6} lg={4} key={website.id} className="mb-2"><StoreCard store={website}/></Col>)}</Row>
        </Container>
    </>
  )
}

export default HomePage;