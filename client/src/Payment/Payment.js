import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Client/Accept/Accept.css';

// const stripePromise = loadStripe('your-publishable-key'); // Replace with your actual publishable key

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

    const { error, paymentIntent } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const response = await fetch('http://localhost:5000/api/endpoints/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }), // Send the actual amount to the backend
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
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
                backgroundColor: 'white',
                height:'80px',
                borderColor:'blue',
              fontSize: '16px',
              color: 'black',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#fa755a',
            },
          },
        }}
      />
      <Button disabled={processing || succeeded} type="submit" className="accept-button">
        {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`} {/* Display amount in dollars */}
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
}

function Accept() {
  return (
    <div className="accept-container">
      <Container>
        <Card className="accept-card">
          <Card.Body>
            <h2>You have accepted the proposal.</h2>
            <p>Please proceed with the payment.</p>
          </Card.Body>
          {/* <Elements stripe={stripePromise}>
            <div   style={{'backgroundColor':'white', 'width':'400px', 'height':'180px'}}>
            <CheckoutForm/>
            </div>

          </Elements> */}
        </Card>
      </Container>
    </div>
  );
}

export default Accept;
