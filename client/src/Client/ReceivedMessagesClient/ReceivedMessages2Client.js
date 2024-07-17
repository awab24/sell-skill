import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
`;

const StyledContainer = styled(Container)`
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const MessageCard = styled(Card)`
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: black;
  border-radius: 12px;
  margin-top: 20px;
`;

const SignUpCard = styled(Card)`
  width: 400px;
  text-align: center;
`;

function ReceivedMessages2Client() {
  const providerId = useSelector((state) => state.allow.providerId);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [permission, setPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProviderToClientMessagesInClient');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setReceivedMessages(result);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSend = async () => {
    try {
      const message = {
        messageId: uuidv4(),
        providerId: providerId,
        message: messageContent,
      };

      await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendMessageFromClientToProvider/${providerId}`, { message });
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token || tokenObject;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermission(response.data.permission);
    };

    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  const deleteClientMessage = async (id) => {
    await axios.delete(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteClientMessage/${id}`);
    setReceivedMessages(receivedMessages.filter(msg => msg.message._id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        {permission ? (
          <div>
            {receivedMessages.length > 0 ? (
              receivedMessages.map((receivedMessage) => (
                receivedMessage.message.providerId === providerId && (
                  <MessageCard key={receivedMessage.message._id}>
                    <span>{receivedMessage.message.message}</span>
                    <Button onClick={() => deleteClientMessage(receivedMessage.message._id)} variant="danger">
                      <FaTrash /> Delete
                    </Button>
                  </MessageCard>
                )
              ))
            ) : (
              <p>No messages received.</p>
            )}
            <Form className="mt-3">
              <Form.Control
                placeholder="Enter a message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </Form>
            <Button onClick={handleSend} className="mt-2" variant="primary">Send</Button>
          </div>
        ) : (
          <SignUpContainer>
            <SignUpCard>
              <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
            </SignUpCard>
          </SignUpContainer>
        )}
      </StyledContainer>
    </>
  );
}

export default ReceivedMessages2Client;
