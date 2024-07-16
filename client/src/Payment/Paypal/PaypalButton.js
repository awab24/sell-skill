import React, { useEffect } from 'react';
import axios from 'axios';

const PaypalButton = ({ amount, description }) => {
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: async (data, actions) => {
                const res = await axios.post('/api/payment/create-payment', { amount, description });
                return res.data.id;
            },
            onApprove: async (data, actions) => {
                const res = await axios.post('/api/payment/execute-payment', {
                    paymentId: data.paymentID,
                    payerId: data.payerID,
                });
                console.log('Payment Successful:', res.data);
            },
            onError: (err) => {
                console.error('PayPal Checkout Error:', err);
            },
        }).render('#paypal-button-container');
    }, [amount, description]);

    return <div id="paypal-button-container"></div>;
};

export default PaypalButton;
