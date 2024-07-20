import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CallInviteBlocks() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#007bff' }}>
      <Row className="mb-4 w-100" style={{'position': 'relative', 'left':'100px'}}>
        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
          <a style={{ cursor: 'pointer', textDecoration: 'none' }} href="/posting-term">
            <Card className="text-center" style={{ width: '100%', maxWidth: '350px', height: '100px', backgroundColor: '#000', color: '#00f', borderRadius: '10px' }}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title className="m-0">
                  <b>Make a Call</b>
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
      <Row className="w-100"  style={{'position': 'relative', 'left':'100px'}}>
        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
          <a style={{ cursor: 'pointer', textDecoration: 'none' }} href="/inviting">
            <Card className="text-center" style={{ width: '100%', maxWidth: '350px', height: '100px', backgroundColor: '#000', color: '#00f', borderRadius: '10px' }}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title className="m-0">
                  <b>Invite a Provider</b>
                </Card.Title>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default CallInviteBlocks;
