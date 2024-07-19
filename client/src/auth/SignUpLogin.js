import React, { useState } from 'react';
import { Button, Alert, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuth, setProviderId, setProviderOrClientId } from '../reducers/reducers';

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
      responseClient = await axios.post('https://sell-skill.com/api/endpoints/clientSignIn', { email, password: '' });
      clientToken = responseClient.data;
      localStorage.setItem('clientToken', JSON.stringify(clientToken));
      responseClient && navigate('/Client');
    } catch (error) {
      setClientResult(false);
      try {
        responseProvider = await axios.post('https://sell-skill.com/api/endpoints/providerSignIn', { email, password: '' });
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
    <div style={{ minHeight: '100vh', backgroundColor: '#007bff', padding: '1rem' }}>
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100%' }}>
        <h1 className="text-white text-center mb-4">SELL-SKILL</h1>
        <h5 className="text-white text-center mb-4">share, act, and interact</h5>
        <Card style={{ width: '100%', maxWidth: '500px', backgroundColor: '#000', color: '#00ccff', borderRadius: '20px', border: '2px solid #ffcc00' }}>
          <Card.Body>
            <Card.Title className="text-center text-white mb-4" style={{ fontSize: '24px' }}>
              <b>Login</b>
            </Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email or username" onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} />
              </Form.Group>
              <Button variant="warning" type="button" onClick={handleClick} className="w-100">
                Log in
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="/sign-up-client-provider" style={{ color: '#ffcc00' }}>
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
        <div className="text-white text-center mt-4">
          <h5><b>What is Sell-Skill?</b></h5>
          <p>
            Sell-Skill is a platform that connects clients with providers. Sign up as a client to get help with your issues from certified and experienced providers. Or sign up as a provider and start sharing your knowledge.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default SignUpLogin;
