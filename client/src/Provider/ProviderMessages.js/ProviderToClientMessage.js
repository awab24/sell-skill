import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProviderToClientMessage() {
  let clientID = useSelector((state) => state.allow.clientId);
  const [messageContent, setMessageContent] = useState('');

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const handleProviderToClientMessage = async () => {
    await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendProviderToClientMessage/${clientID}`, { _id: uuidv4(), message: messageContent });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getMessagesFromClientIntoProvider');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result =   response.json();
        setMessages(result);
        console.log('messages========================>  ', messages, '  <========================messages')
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const [permission, setPermission] = useState(false);
  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  let token = tokenObject?.token || tokenObject;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider', {
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

  const deleteProviderMessage = async (e) => {
    await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteProviderMessage/' + e);
  };

  return (
    <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {permission ? (
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <Card key={message._id} className="mb-3">
                    {message.clientId === clientID && (
                      <Card.Body>
                        <Card.Text>{message.message}</Card.Text>
                        <Button variant="danger" onClick={() => deleteProviderMessage(message.message._id)}>
                          <FaTrash /> Delete message
                        </Button>
                      </Card.Body>
                    )}
                  </Card>
                ))
              ) : (
                <Card className="mb-3">
                  <Card.Body>No messages available.</Card.Body>
                </Card>
              )}
            </div>
            <Form className="mt-3">
              <Form.Control
                placeholder="Enter a message"
                onChange={(e) => setMessageContent(e.target.value)}
                className="mb-3"
              />
              <Button variant="primary" onClick={handleProviderToClientMessage}>
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Card className="p-4" style={{ maxWidth: '400px' }}>
            <Button variant="primary" onClick={navigateSignUpIn}>
              Sign up/in
            </Button>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default ProviderToClientMessage;
