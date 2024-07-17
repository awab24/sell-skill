import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClientId } from '../../reducers/reducers';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleClickOnMessage = (id) => {
    navigate('/provider-client-messaging');
    dispatch(setClientId(id));
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
        messages.map((message) => console.log('providerId from message ===========================> ',message.message.providerId,' <================================providerId from message'))
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }

      try {
        responseProviderId = await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendProviderIdToFront');
        responseProviderId =  await responseProviderId.data;
        console.log('providerId===========================> ',providerId, ' <=====================================providerId')
        setProviderId(responseProviderId);
      } catch (error) {
        console.error('Failed to fetch provider ID:', error);
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
        console.log(response.data.permission);
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
    <Container fluid className="py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {permission ? (
        <Row className="justify-content-center">
          {messages.length > 0 ? (
            messages.map((message) => (
              <Col xs={12} md={6} lg={4} key={message.message.clientId} className="mb-4">
                {message.message.name && providerId === message.message.providerId && (
                  <Card>
                    <Card.Body>
                      <Card.Title>{message.message.name}</Card.Title>
                      <Button variant="primary" onClick={() => handleClickOnMessage(message.message.clientId)}>
                        View Message
                      </Button>
                    </Card.Body>
                  </Card>
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

export default ProviderMessages;
