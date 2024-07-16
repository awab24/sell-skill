import React, { useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #004e92; /* Blue background */
    color: #ffffff;
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
  border-radius: 40px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 30px;
  color: black;
  margin-top: 20px;
`;

const TextArea = styled(Form.Control)`
  height: 400px;
  border-radius: 30px;
  background-color: #f0f0f0;
  color: black;
`;

const NextButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

function Letter() {
  const [letter, setLetter] = useState('');
  const navigate = useNavigate();

  const handleNextClick = async () => {
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertLetter', letter);
    navigate("/certifications");
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Cover Letter</b>
          </Title>
          <Form style={{ padding: '20px' }}>
            <TextArea
              as="textarea"
              placeholder="Enter a cover letter for your profile"
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
            />
            <NextButton onClick={handleNextClick}>Next</NextButton>
          </Form>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default Letter;
