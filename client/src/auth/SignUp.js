import React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
  return (
    <div style={{ backgroundColor: '#007bff', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container className="d-flex justify-content-center">
        <Card style={{ borderRadius: '30px', backgroundColor: '#000', width: '100%', maxWidth: '700px', padding: '20px', color: '#007bff' }}>
          <Card.Title className="text-center" style={{ fontSize: '24px', margin: '20px 0' }}>
            Sign Up
          </Card.Title>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Col sm={12}>
                <Form.Control type="text" placeholder="Name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formSurname">
              <Col sm={12}>
                <Form.Control type="text" placeholder="Surname" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Col sm={12}>
                <Form.Control type="email" placeholder="Email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Col sm={12}>
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formConfirmPassword">
              <Col sm={12}>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" style={{ borderRadius: '30px', padding: '10px' }}>
              Sign Up
            </Button>
          </Form>
          <div className="text-center mt-3">
            <a href="/auth" style={{ color: '#007bff' }}>
              Already have an account? Let's sign in
            </a>
          </div>
          <div className="text-center mt-3">
            <GoogleLogin />
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default SignUp;


