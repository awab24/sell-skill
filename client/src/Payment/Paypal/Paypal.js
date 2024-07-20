import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import './PayPalCheckout.css'; // Add your custom styles here

const PayPalCheckout = ({ description, onSuccess }) => {
  const amount = useSelector((state) => state.allow.amount);
  const [paid, setPaid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState(false);
  
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token || tokenObject;
  const navigate = useNavigate();

  const initialOptions = {
    currency: 'USD',
  };

  const providerId = useSelector((state) => state.allow.proposalId)
  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermission(response.data.permission);
    };

    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <Container className="paypal-checkout-container">
      {
        permission ? (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: amount,
                    },
                    description: description,
                  }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                setPaid(true);
                setCompleted(true);
                await axios.post(`https://sell-skill.com/api/endpoints/payProvider/${providerId}`, {
                  providerAmount: (amount * 70) / 100
                });
                onSuccess(details);
              }}
              onError={(err) => {
                setError(err);
                console.error('PayPal Checkout onError', err);
              }}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="sign-up-container">
            <Card className="sign-up-card">
              <Card.Body>
                <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
              </Card.Body>
            </Card>
          </div>
        )
      }
      {error && <div className="error-message">{error.message}</div>}
    </Container>
  );
}

export default PayPalCheckout;
