import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DetermineSignUp() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#007bff' }}>
      <Container className="text-center">
        <Row className="mb-5">
          <Col>
            <Button
              variant="primary"
              size="lg"
              href="/client-sign-up"
              className="w-100"
              style={{ padding: '20px', borderRadius: '10px' }}
            >
              Client
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="secondary"
              size="lg"
              href="/provider-sign-up"
              className="w-100"
              style={{ padding: '20px', borderRadius: '10px' }}
            >
              Provider
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetermineSignUp;
