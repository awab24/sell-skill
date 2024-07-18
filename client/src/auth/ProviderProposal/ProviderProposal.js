import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProviderProposal() {
  const [proposal, setProposal] = useState('');
  const handleProposalSubmit = async () => {
    await axios.post('https://sell-skill.com/api/endpoints/submitProposal', { proposal });
  };

  const [permission, setPermission] = useState(false);
  let token;
  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token;
  if (!token) {
    token = tokenObject;
  }
  console.log('token from mainHome => ' + token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyProvider', {
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007bff' }}>
      <Container className="text-center">
        {permission ? (
          <>
            <Card className="p-4" style={{ backgroundColor: '#000', color: '#fff', borderRadius: '20px', maxWidth: '600px', margin: 'auto' }}>
              <Card.Title className="mb-4">Submit Your Proposal</Card.Title>
              <Form>
                <Form.Group controlId="formProposal">
                  <Form.Control
                    type="text"
                    placeholder="Enter your proposal"
                    onChange={(e) => setProposal(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </Form.Group>
                <Button onClick={handleProposalSubmit} variant="primary" style={{ width: '100%' }}>
                  Submit
                </Button>
              </Form>
            </Card>
          </>
        ) : (
          <div className="d-flex justify-content-center" style={{ height: '200px' }}>
            <Card className="p-4" style={{ backgroundColor: '#000', color: '#fff', borderRadius: '20px' }}>
              <Card.Title className="mb-3">Access Restricted</Card.Title>
              <Button onClick={navigateSignUpIn} variant="primary" style={{ width: '100%' }}>
                Sign Up / Sign In
              </Button>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProviderProposal;
