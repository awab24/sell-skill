import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';

function ClientMessages() {
  const [messageContent, setMessageContent] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const providerId = useSelector((state) => state.allow.proposalId);
  const navigate = useNavigate();

  const auth = localStorage.getItem('authenticated');
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject.token;

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
        _id: providerId,
        message: messageContent
      };

      await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendMessageFromClientToProvider/${providerId}`, { message });
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermission(response.data.permission);
    };

    fetchPermission();
  }, []);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <Container className="mt-4">
      {permission ? (
        <>
          <Row className="mb-4">
            {receivedMessages.length > 0 ? (
              receivedMessages.map((receivedMessage) =>
                receivedMessage.message.providerId === providerId ? (
                  <Col xs={12} sm={6} md={4} lg={3} key={receivedMessage._id} className="mb-3">
                    <Card>
                      <Card.Body>
                        {receivedMessage.message.message}
                      </Card.Body>
                    </Card>
                  </Col>
                ) : null
              )
            ) : (
              <p>No messages available.</p>
            )}
          </Row>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Insert your message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="me-2"
            />
            <Button onClick={handleSend}>Send</Button>
          </Form>
        </>
      ) : (
        <div className="text-center mt-5">
          <Card className="w-50 mx-auto">
            <Card.Body>
              <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default ClientMessages;
