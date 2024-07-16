import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    @media (max-width: 600px) {
        margin: 10px;
    }
`;

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

    return (
        <ButtonContainer>
            <div id="paypal-button-container"></div>
        </ButtonContainer>
    );
};

export default PaypalButton;
