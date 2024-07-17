import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProviderId } from '../../reducers/reducers';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(to bottom, #000428, #004e92);
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const StyledContainer = styled(Container)`
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const MessageCard = styled(Card)`
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: black;
  border-radius: 12px;
`;

const SignUpCard = styled(Card)`
  width: 400px;
  text-align: center;
`;

function ReceivedMessages1Client() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [permission, setPermission] = useState(false);

  const handleNameClick = (id) => {
    navigate("/client-access-messages");
    dispatch(setProviderId(id));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill.com/api/endpoints/getProviderToClientMessagesInClient');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setReceivedMessages(result);
        await axios.patch('https://sell-skill.com/api/endpoints/cancelClientNewMessages');
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token || tokenObject;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermission(response.data.permission);
    };

    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        {
          permission ? (
            <div>
              {receivedMessages.length > 0 ? (
                receivedMessages.map((receivedMessage) => (
                  <MessageCard key={receivedMessage.message.providerId}>
                    {receivedMessage.message.name && (
                      <Button onClick={() => handleNameClick(receivedMessage.message.providerId)} variant="light" style={{ width: '100%' }}>
                        {receivedMessage.message.name}
                      </Button>
                    )}
                  </MessageCard>
                ))
              ) : (
                <p>No messages received.</p>
              )}
            </div>
          ) : (
            <SignUpContainer>
              <SignUpCard>
                <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
              </SignUpCard>
            </SignUpContainer>
          )
        }
      </StyledContainer>
    </>
  );
}

export default ReceivedMessages1Client;
