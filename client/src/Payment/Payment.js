import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled, { createGlobalStyle } from 'styled-components';
import '../Client/Accept/Accept.css';

// Replace with your actual publishable key
// const stripePromise = loadStripe('your-publishable-key');

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #000428, #004e92);
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const CheckoutFormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardElementStyle = {
  base: {
    backgroundColor: 'white',
    height: '60px',
    borderColor: 'blue',
    fontSize: '16px',
    color: 'black',
    '::placeholder': {
      color: 'black',
    },
  },
  invalid: {
    color: '#fa755a',
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [amount, setAmount] = useState(5000); // Amount in cents ($50.00)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const response = await fetch('https://sell-skill.com/api/endpoints/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate('/client');
    }
  };

  return (
    <CheckoutFormContainer>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ style: CardElementStyle }} />
        <Button disabled={processing || succeeded} type="submit" className="accept-button" style={{ marginTop: '20px' }}>
          {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </form>
    </CheckoutFormContainer>
  );
}

function Accept() {
  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <StyledCard>
          <Card.Body>
            <h2>You have accepted the proposal.</h2>
            <p>Please proceed with the payment.</p>
          </Card.Body>
        </StyledCard>
        {/* Uncomment when using Stripe */}
        {/* <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements> */}
      </StyledContainer>
    </>
  );
}

export default Accept;
