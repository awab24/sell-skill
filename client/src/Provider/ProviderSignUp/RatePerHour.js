import React, { useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
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
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 24px;
  color: white;
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin: 20px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

function RatePerHour() {
  const [rate, setRate] = useState('');
  const navigate = useNavigate();

  const handleNextClick = async () => {
    navigate("/payment-register");
    await axios.post('https://sell-skill.com/api/endpoints/addRate', { ratePerHour: rate });
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Rate per Hour</b>
          </Title>
          <StyledForm>
            <Form.Control 
              placeholder='How much you wanna take per hour?' 
              onChange={(e) => setRate(e.target.value)} 
              style={{ borderRadius: '20px' }}
            />
          </StyledForm>
          <SubmitButton onClick={handleNextClick}>Next</SubmitButton>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default RatePerHour;
