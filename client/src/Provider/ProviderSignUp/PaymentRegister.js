import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #004e92; /* Blue background */
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainCard = styled(Card)`
  background-color: black;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 24px;
  color: white;
  margin-top: 20px;
`;

const EmailInput = styled(Form.Control)`
  margin: 20px 0;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: black;
`;

const NextButton = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
`;

function PaymentRegister() {
  const [paypalEmail, setPaypalEmail] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    navigate("/provider");
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPaypalEmail', { paypalEmail });

  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Payment Registration</b>
          </Title>
          <Form style={{ padding: '20px' }}>
            <EmailInput
              type="email"
              placeholder="Enter your correct PayPal email"
              onChange={(e) => setPaypalEmail(e.target.value)}
              value={paypalEmail}
            />
            <NextButton onClick={handleNext}>Next</NextButton>
          </Form>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default PaymentRegister;
