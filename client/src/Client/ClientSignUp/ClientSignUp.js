import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClientSignUp() {
  const navigate = useNavigate();
  const [clientSignUpData, setClientSignUpData] = useState({
    _id: uuidv4(),
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alreadyClientExist, setAlreadyClientExist] = useState(false);

  const handleClientSignUp = async () => {
    const responseClient = await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/clientSignUp', clientSignUpData);
    const clientToken = responseClient.data;
    
    if (!clientToken) {
      setAlreadyClientExist(true);
    } else {
      localStorage.setItem('clientToken', JSON.stringify(clientToken));
      navigate("/client-profile-picture");
    }
  };

  const googleSuccess = async (response) => {
    const { credential } = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const { email, name, family_name } = payload;

    const responseClient = await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/clientSignUp', {
      _id: uuidv4(),
      name,
      surname: family_name,
      email,
      password: '',
      confirmPassword: ''
    });
    
    const clientToken = responseClient.data;
    if (!clientToken) {
      setAlreadyClientExist(true);
    } else {
      localStorage.setItem('clientToken', JSON.stringify(clientToken));
      navigate("/client-profile-picture");
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <Card style={styles.outerCard}>
          <Card style={styles.innerCard}>
            <Card.Title style={styles.title}>
              Sign up as a client
            </Card.Title>
            <Form style={styles.form}>
              <Form.Control
                placeholder='Name'
                onChange={(e) => setClientSignUpData({ ...clientSignUpData, name: e.target.value })}
              />
              <Form.Control
                placeholder='Surname'
                onChange={(e) => setClientSignUpData({ ...clientSignUpData, surname: e.target.value })}
              />
              <Form.Control
                placeholder='Email'
                onChange={(e) => setClientSignUpData({ ...clientSignUpData, email: e.target.value })}
              />
              <Form.Control
                placeholder='Password'
                type="password"
                onChange={(e) => setClientSignUpData({ ...clientSignUpData, password: e.target.value })}
              />
              <Form.Control
                placeholder='Confirm Password'
                type="password"
                onChange={(e) => setClientSignUpData({ ...clientSignUpData, confirmPassword: e.target.value })}
              />
              <Button style={styles.button} onClick={handleClientSignUp}>
                Sign Up
              </Button>
              <div style={styles.link}>
                Already have an account? <a href="/auth">Let's Sign In</a>
              </div>
              <div style={styles.googleLogin}>
                <GoogleLogin onSuccess={googleSuccess} />
              </div>
              {alreadyClientExist && <div style={styles.error}>Email already exists</div>}
            </Form>
          </Card>
        </Card>
      </Container>
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
  outerCard: {
    height: 'auto',
    borderRadius: '30px',
    backgroundColor: 'black',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  innerCard: {
    borderRadius: '30px',
    backgroundColor: 'blue',
    padding: '20px',
  },
  title: {
    color: 'blue',
    fontSize: '20px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginTop: '20px',
    borderRadius: '30px',
  },
  link: {
    textAlign: 'center',
    marginTop: '10px',
    color: 'white',
  },
  googleLogin: {
    textAlign: 'center',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default ClientSignUp;
