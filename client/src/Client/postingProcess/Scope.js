import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewEstimate } from '../../reducers/reducers';
import axios from 'axios';

function Scope() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPostData = useSelector((state) => state.allow.overview);
  const [postData, setPostData] = useState(previousPostData);
  const [permission, setPermission] = useState(false);

  let token = JSON.parse(localStorage.getItem('clientToken'))?.token;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const handleNextClick = () => {
    dispatch(setOverviewEstimate(postData));
    navigate("/posting-experience");
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
                <b style={{ color: 'black' }}>Request's Scope</b>
              </Card.Title>

              <div style={styles.buttonContainer}>
                <Button style={styles.button} onClick={() => setPostData({ ...postData, scope: 'Large' })}><b>Large</b></Button>
                <Button style={styles.button} onClick={() => setPostData({ ...postData, scope: 'Medium' })}><b>Medium</b></Button>
                <Button style={styles.button} onClick={() => setPostData({ ...postData, scope: 'Small' })}><b>Small</b></Button>
              </div>

              <Button style={styles.nextButton} onClick={handleNextClick}>Next</Button>
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
    margin: '30px 0 0 0',
    fontSize: '25px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
  },
  button: {
    width: '150px',
    height: '60px',
    color: 'black',
    fontSize: '18px',
  },
  nextButton: {
    width: '80%',
    marginTop: '40px',
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

export default Scope;
