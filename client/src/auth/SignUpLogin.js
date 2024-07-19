import React, { useState } from 'react';
import { Button, Alert, Card, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuth, setProviderId, setProviderOrClientId } from '../reducers/reducers';
import ImgSlider from './ImgSlider';

function SignUpLogin() {
  const dispatch = useDispatch();
  const [notAllowed, setNotAllowed] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  let responseProvider;
  let responseClient;
  let responseProviderId;
  let clientToken;
  let providerToken;
  const [clientResult, setClientResult] = useState(true);
  const [providerResult, setProviderResult] = useState(true);

  const googleSuccess = async (response) => {
    const { credential } = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const { email } = payload;
    console.log('email => ' + email);

    try {
      responseClient = await axios.post('https://sell-skill.com/api/endpoints/clientSignIn', { email: email, password: '' });
      clientToken = responseClient.data;

      localStorage.setItem('clientToken', JSON.stringify(clientToken));
      responseClient && navigate('/Client');
    } catch (error) {
      setClientResult(false);
      try {
        responseProvider = await axios.post('https://sell-skill.com/api/endpoints/providerSignIn', { email: email, password: '' });
        providerToken = responseProvider.data;
        localStorage.setItem('providerToken', JSON.stringify(providerToken));
        responseProvider && navigate('/provider');
      } catch (error) {
        setProviderResult(false);
      }
    }
  };

  const handleClick = async () => {
    try {
      try {
        responseClient = await axios.post('https://sell-skill.com/api/endpoints/clientSignIn', signInData);
        clientToken = responseClient.data;
        console.log('token ======================================================> ' + clientToken);
        localStorage.setItem('clientToken', JSON.stringify(clientToken));
      } catch (error) {
        setClientResult(false);
        try {
          responseProvider = await axios.post('https://sell-skill.com/api/endpoints/providerSignIn', signInData);
          providerToken = responseProvider.data;
          console.log('token ======================================================> ' + providerToken);
          localStorage.setItem('providerToken', JSON.stringify(providerToken));
        } catch (secondError) {
          setProviderResult(false);
          console.error('Both sign-in attempts failed:', secondError);
          return;
        }
      }

      localStorage.setItem('authenticated', 'true');
      dispatch(changeAuth(true));

      responseClient && navigate('/Client');
      console.log('responseClient ====================================>>>>>>>>>> ' + responseClient);
      responseProvider && navigate('/provider');
      if (responseClient || responseProvider) {
        const responseProviderOrClientId = await axios.get('https://sell-skill.com/api/endpoints/providerOrClientId');
        console.log(dispatch(setProviderOrClientId(responseProviderOrClientId.data)));
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setNotAllowed(true);
      localStorage.setItem('authenticated', 'false');
      dispatch(changeAuth(false));
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#007bff' }}>
    <ImgSlider />
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <Card style={{ width: '100%', maxWidth: '500px', backgroundColor: '#000', color: '#007bff', borderRadius: '20px' }}>
          <Card.Body>
            <Card.Title className="text-center" style={{ color: '#fff', fontSize: '24px' }}>
              <b>Login</b>
            </Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email or username" onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} />
              </Form.Group>
              <Button variant="primary" type="button" onClick={handleClick} className="w-100">
                Log in
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="/sign-up-client-provider" style={{ color: '#007bff' }}>
                Don't have an account? Let's sign up
              </a>
            </div>
            <div className="text-center mt-3">
              <GoogleLogin onSuccess={googleSuccess} />
            </div>
            {notAllowed && (
              <Alert variant="danger" className="mt-3">
                Not allowed, please make sure you have an account
              </Alert>
            )}
            {!clientResult && !providerResult && (
              <Alert variant="danger" className="mt-3">
                Email or password might be incorrect
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SignUpLogin;
