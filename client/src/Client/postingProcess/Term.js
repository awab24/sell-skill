import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setOverviewTerm } from '../../reducers/reducers';
import axios from 'axios';

function Term() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    _id: uuidv4(),
    term: '',
    title: '',
    skills: [],
    estimate: '',
    experience: '',
    budget: '',
    description: ''
  });
  
  const [permission, setPermission] = useState(false);
  let token = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(token);
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

  const handleNextClick = () => {
    dispatch(setOverviewTerm(postData));
    navigate("/posting-title");
  };

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <div style={styles.container}>
      {permission ? (
        <Container>
          <Card style={styles.outerCard}>
            <Card style={styles.innerCard}>
              <Card.Title style={styles.title}>
                <b>Is it one time or a lot?</b>
              </Card.Title>
              <div style={styles.buttonContainer}>
                <Button style={styles.button} onClick={handleNextClick}>
                  <Card style={styles.cardOption}>
                    <Card.Title>
                      <b style={styles.cardText}>Only one call</b>
                    </Card.Title>
                  </Card>
                </Button>

                <Button style={styles.button} onClick={handleNextClick}>
                  <Card style={{ ...styles.cardOption, marginLeft: '20px' }}>
                    <Card.Title>
                      <b style={styles.cardText}>A lot</b>
                    </Card.Title>
                  </Card>
                </Button>
              </div>
            </Card>
          </Card>
        </Container>
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
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCard: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: 'black',
    width: '90%',
    maxWidth: '800px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  innerCard: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: 'black',
    textAlign: 'center',
  },
  title: {
    color: 'blue',
    fontSize: '23px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    cursor: 'pointer',
    color: 'blue',
    flex: 1,
    margin: '5px',
  },
  cardOption: {
    backgroundColor: 'blue',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
  },
  cardText: {
    color: 'black',
  },
  permissionContainer: {
    textAlign: 'center',
  },
  permissionCard: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '10px',
  },
};

export default Term;
