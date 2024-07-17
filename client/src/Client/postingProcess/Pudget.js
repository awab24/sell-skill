import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewPudget } from '../../reducers/reducers';
import axios from 'axios';

function Pudget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPostData = useSelector((state) => state.allow.overview);
  const [postData, setPostData] = useState(previousPostData);
  const [permission, setPermission] = useState(false);
  
  let token = JSON.parse(localStorage.getItem('clientToken'))?.token;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const handleNextClick = () => {
    dispatch(setOverviewPudget(postData));
    navigate("/posting-description");
  };

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <div style={styles.container}>
      {permission ? (
        <Container>
          <Card style={styles.card}>
            <Card style={styles.innerCard}>
              <Card.Title style={styles.title}>
                <b>Pudget</b>
              </Card.Title>
              <Form style={styles.form}>
                <Form.Control
                  placeholder='Enter the budget you will pay for this request'
                  onChange={(e) => setPostData({ ...postData, pudget: e.target.value })}
                />
              </Form>
              <Button onClick={handleNextClick} style={styles.nextButton}>
                Next
              </Button>
            </Card>
          </Card>
        </Container>
      ) : (
        <div style={styles.signInPrompt}>
          <Card style={styles.promptCard}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '500px',
    backgroundColor: 'black',
    color: 'blue',
    borderRadius: '40px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  innerCard: {
    backgroundColor: 'blue',
    width: '100%',
    height: '330px',
    borderRadius: '40px',
    position: 'relative',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    margin: '50px 0 0 0',
    fontSize: '30px',
    color: 'black',
  },
  form: {
    position: 'relative',
    top: '30px',
    width: '80%',
    margin: '0 auto',
  },
  nextButton: {
    width: '100%',
    marginTop: '30px',
  },
  signInPrompt: {
    textAlign: 'center',
    marginTop: '170px',
  },
  promptCard: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'black',
    color: 'blue',
  },
};

export default Pudget;
