// components/PaymentCancel.js

import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './PaymentCancel.css'; // Add your custom styles here

const PaymentCancel = () => {
  return (
    <Container className="payment-cancel-container">
      <Card className="payment-cancel-card">
        <Card.Body>
          <h2 className="cancel-message">Payment cancelled by user.</h2>
          <Button variant="primary" onClick={() => window.location.href = '/choose-method'}>
            Return to Payment Options
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentCancel;
