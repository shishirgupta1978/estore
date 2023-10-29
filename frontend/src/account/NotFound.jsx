import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Alert variant="danger" className="mt-5 text-center">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
