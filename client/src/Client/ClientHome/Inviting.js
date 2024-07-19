import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

function Inviting() {
  const [permission, setPermission] = useState(false);
  const [providerEmail, setProviderEmail] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token;
  if (!token) {
    token = tokenObject;
  }
  console.log('token from mainHome => ' + token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get(
        'https://sell-skill.com/api/endpoints/verifyClient',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.permission);
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, []);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  const handleInvite = async () => {
    navigate('/client');
    await axios.post(
      'https://sell-skill.com/api/endpoints/sendInvite',
      { providerEmail: providerEmail, message: invitationMessage }
    );
  };

  return (
    <InvitingContainer>
      {permission ? (
        <FormContainer>
          <StyledForm>
            <Form.Control
              placeholder="Enter the provider's email"
              onChange={(e) => setProviderEmail(e.target.value)}
            />
          </StyledForm>
          <StyledForm>
            <Form.Control
              placeholder="Enter your invitation message"
              onChange={(e) => setInvitationMessage(e.target.value)}
            />
          </StyledForm>
          <StyledButton onClick={handleInvite}>Invite</StyledButton>
        </FormContainer>
      ) : (
        <PermissionDeniedContainer>
          <Card>
            <Card.Body>
              <Button onClick={navigateSignUpIn}>Sign up/in</Button>
            </Card.Body>
          </Card>
        </PermissionDeniedContainer>
      )}
    </InvitingContainer>
  );
}

export default Inviting;

const InvitingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const PermissionDeniedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  height: 200px;
  width: 800px;
  border-radius: 8px;
  color: #fff;

  @media (max-width: 768px) {
    width: 90%;
  }

  Card {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background-color: #343a40;
    color: #fff;
    border: none;

    Button {
      width: 100%;
      background-color: #007bff;
      border: none;
      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;
