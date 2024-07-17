import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClientId } from '../../reducers/reducers';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function ProviderMessages() {
  let responseProviderId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [providerId, setProviderId] = useState('');
  const [permission, setPermission] = useState(false);
  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  let token = tokenObject?.token || tokenObject;

  const fetchProviderID = async () => {
    responseProviderId = await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendProviderIdToFront');
    responseProviderId = await responseProviderId.data;
    setProviderId(responseProviderId);
  };

  useEffect(() => {
    fetchProviderID();
  }, []);

  const handleClickOnMessage = (id) => {
    dispatch(setClientId(id));
    navigate('/provider-client-messaging');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getMessagesFromClientIntoProvider');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setMessages(result);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPermission(response.data.permission);
        await axios.patch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/cancelProviderNewMessages');
      } catch (error) {
        console.error('Failed to verify provider:', error);
      }
    };

    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer fluid className="py-5">
        {permission ? (
          <Row className="justify-content-center">
            {messages.length > 0 ? (
              messages.map((message) => (
                <Col xs={12} md={6} lg={4} key={message.message.clientId} className="mb-4">
                  {message.message.name && (
                    <MessageCard>
                      <Card.Body>
                        <Button variant="light" onClick={() => handleClickOnMessage(message.message.clientId)} style={{ width: '100%' }}>
                          {message.message.name}
                        </Button>
                      </Card.Body>
                    </MessageCard>
                  )}
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center">
                <div>No messages available.</div>
              </Col>
            )}
          </Row>
        ) : (
          <SignUpContainer>
            <SignUpCard className="p-4">
              <Button variant="primary" onClick={navigateSignUpIn}>
                Sign up/in
              </Button>
            </SignUpCard>
          </SignUpContainer>
        )}
      </StyledContainer>
    </>
  );
}

export default ProviderMessages;
