import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Context from "../context";
import {Spinner, Container, Row, Col, Button, Card} from "react-bootstrap";
import StoreCard from "../stores/StoreCard";

const HomePage = () => {
  const { search, axiosApi } = useContext(Context);
 const navigate=useNavigate();
  const [websites, setWebsites] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  

	useEffect(() => {
    const config = { method: "get", headers: { "Content-Type": "application/json" } }
    axiosApi(`store/websites/`, config, setWebsites);
}, []);




  return (
    <>
    {websites.is_loading && <Spinner />}
    <div className="bg-primary text-white text-center py-5">

        <Container>
          <h1>Welcome to Our Store Creator</h1>
          <p>Create your dream store with ease</p>
          <Button variant="dark" onClick={()=>{navigate('/website/create/')}}>Get Started</Button>
        </Container>
      </div>

      <Container>
        <h2 className="text-center mb-4">Key Features</h2>
        <Row>
          <Col xs={12} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Add and Update</Card.Title>
                <Card.Text>You can add or update product/categories according to your choice.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Customization</Card.Title>
                <Card.Text>Add offers banner of your choice.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Email Service</Card.Title>
                <Card.Text>Receive your order on email.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        <Container className="mt-3">
        <h2 className="text-center mb-4">Some Stores</h2>
          <Row>{websites.is_success && websites.result && websites.result.filter((website) => website.store_name.toLowerCase().includes(search.toLowerCase())).map((website) => <Col  sm={12} md={6} lg={4} key={website.id} className="mb-2"><StoreCard store={website}/></Col>)}</Row>
        </Container>
    </>
  )
}

export default HomePage;