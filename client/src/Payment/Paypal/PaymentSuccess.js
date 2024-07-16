// components/PaymentSuccess.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import './PaymentSuccess.css'; // Add your custom styles here

const PaymentSuccess = (props) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const location = useLocation();

  useEffect(() => {
    const executePayment = async () => {
      const params = new URLSearchParams(location.search);
      const paymentId = params.get('paymentId');
      const payerId = params.get('PayerID');

      try {
        const response = await axios.post('/api/pay/execute', {
          paymentId,
          payerId,
        });

        const { status } = response.data;
        setPaymentStatus(status);
      } catch (error) {
        console.error('Error executing PayPal payment:', error);
        setPaymentStatus('error');
      }
    };

    executePayment();
  }, [location.search]);

  return (
    <Container className="payment-success-container">
      <Card className="payment-success-card">
        <Card.Body>
          {paymentStatus === 'success' ? (
            <h2 className="success-message">Payment successful!</h2>
          ) : paymentStatus === 'error' ? (
            <h2 className="error-message">Payment failed. Please try again.</h2>
          ) : (
            <h2>Processing your payment...</h2>
          )}
          <Button variant="primary" onClick={() => window.location.href = '/client'}>
            Go to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
