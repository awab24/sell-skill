// components/PaymentSuccess.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
        // Handle error (e.g., show error message)
        setPaymentStatus('error');
      }
    };

    executePayment();
  }, [location.search]);

  return (
    <div>
      {paymentStatus === 'success' && (
        <h2>Payment successful!</h2>
      )}
      {paymentStatus === 'error' && (
        <h2>Payment failed. Please try again.</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
