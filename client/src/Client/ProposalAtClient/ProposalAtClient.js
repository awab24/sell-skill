import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProposalAtClient() {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();
  const proposalId = useSelector((state) => state.allow.proposalId);
  
  const handleAccept = () => {
    navigate("/accept");
  };

  const handleMessage = () => {
    navigate("/client-messages");
  };

  const handleSeeProfile = async () => {
    navigate("/provider-profile");
    await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/proposalId/${proposalId}`);
  };

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProposals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProposals(result);
      } catch (error) {
        console.error('Failed to fetch proposals:', error);
      }
    };

    fetchProposals();
  }, []);

  const [permission, setPermission] = useState(false);
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token || tokenObject;

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
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <div style={styles.container}>
      {permission ? (
        proposals.length > 0 ? (
          proposals.map((proposal) =>
            proposalId === proposal.proposalId ? (
              <Container key={proposal.proposalId} style={styles.cardContainer}>
                <Card style={styles.card}>
                  <Card.Title style={styles.cardTitle}>
                    Proposal Content
                  </Card.Title>
                  <Card.Body style={styles.cardBody}>
                    {proposal.proposal.substring(2, proposal.proposal.length - 5)}
                  </Card.Body>
                  <div style={styles.buttonContainer}>
                    <Button style={styles.button} onClick={handleAccept}>Accept</Button>
                    <Button style={styles.button} onClick={handleMessage}>Message</Button>
                    <Button style={styles.button} onClick={handleSeeProfile}>See Profile</Button>
                  </div>
                </Card>
              </Container>
            ) : null
          )
        ) : (
          <p>No proposals available.</p>
        )
      ) : (
        <div style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'blue',
    padding: '20px',
    minHeight: '100vh',
  },
  cardContainer: {
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  cardTitle: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: '20px',
  },
  cardBody: {
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '10px',
  },
  button: {
    width: '30%',
    color: 'black',
    borderRadius: '5px',
  },
  permissionContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  permissionCard: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
  },
};

export default ProposalAtClient;
