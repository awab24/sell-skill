import React, { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Accept.css';
import axios from 'axios';

function Accept() {
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false);
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token;
  if (!token) {
    token = tokenObject;
  }
  console.log('token from mainHome => ' + token);

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.permission);
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <div className="accept-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007bff' }}>
      {permission ? (
        <Container className="text-center">
          <Card className="p-4" style={{ backgroundColor: '#000', color: '#fff', borderRadius: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Card.Body>
              <Card.Title className="mb-4">Proposal Accepted</Card.Title>
              <Card.Text>You have accepted the proposal.</Card.Text>
              <Button className="accept-button" onClick={() => navigate('/choose-method')} variant="primary" style={{ width: '100%' }}>
                Go to Payment $
              </Button>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Container className="text-center">
          <Card className="p-4" style={{ backgroundColor: '#000', color: '#fff', borderRadius: '20px', maxWidth: '600px', margin: 'auto' }}>
            <Card.Body>
              <Card.Title className="mb-4">Access Restricted</Card.Title>
              <Button onClick={navigateSignUpIn} variant="primary" style={{ width: '100%' }}>
                Sign Up / Sign In
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default Accept;
