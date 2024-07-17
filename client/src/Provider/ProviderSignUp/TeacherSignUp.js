import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
  max-width: 700px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  color: blue;
  margin-top: 20px;
  font-size: 24px;
`;

const StyledForm = styled(Form)`
  margin: 20px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

function TeacherAuth() {
  const [providerSignUpData, setProviderSignUpData] = useState({
    _id: uuidv4(),
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alreadyProviderExist, setAlreadyProviderExist] = useState(false);
  const navigate = useNavigate();

  const googleSuccess = async (response) => {
    const { credential } = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const { email, name, family_name } = payload;

    try {
      const responseProvider = await axios.post('https://sell-skill.com/api/endpoints/providerSignUpData', {
        _id: uuidv4(),
        name,
        surname: family_name,
        email,
        password: '',
        confirmPassword: ''
      });
      const providerToken = responseProvider.data;

      if (!providerToken) {
        setAlreadyProviderExist(true);
      } else {
        localStorage.setItem('providerToken', JSON.stringify(providerToken));
        navigate("/profile-picture");
      }
    } catch (error) {
      setAlreadyProviderExist(true);
    }
  };

  const handleProviderSignUp = async () => {
    try {
      const responseProvider = await axios.post('https://sell-skill.com/api/endpoints/providerSignUpData', providerSignUpData);
      const providerToken = responseProvider.data;

      if (!providerToken) {
        setAlreadyProviderExist(true);
      } else {
        localStorage.setItem('providerToken', JSON.stringify(providerToken));
        navigate("/profile-picture");
      }
    } catch (error) {
      setAlreadyProviderExist(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>Sign up as a provider</Title>
          <StyledForm>
            <Form.Control placeholder='Name' onChange={(e) => setProviderSignUpData({ ...providerSignUpData, name: e.target.value })} />
            <Form.Control placeholder='Surname' onChange={(e) => setProviderSignUpData({ ...providerSignUpData, surname: e.target.value })} />
            <Form.Control placeholder='Email' onChange={(e) => setProviderSignUpData({ ...providerSignUpData, email: e.target.value })} />
            <Form.Control type='password' placeholder='Password' onChange={(e) => setProviderSignUpData({ ...providerSignUpData, password: e.target.value })} />
            <Form.Control type='password' placeholder='Confirm Password' onChange={(e) => setProviderSignUpData({ ...providerSignUpData, confirmPassword: e.target.value })} />
            
            <SubmitButton onClick={handleProviderSignUp}>Next</SubmitButton>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <a href="/auth">Already have an account? Let's sign in</a>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <GoogleLogin onSuccess={googleSuccess} />
            </div>
            {alreadyProviderExist && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>Email already exists</div>}
          </StyledForm>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default TeacherAuth;
