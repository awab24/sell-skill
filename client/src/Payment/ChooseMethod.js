import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAmount } from '../reducers/reducers';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
  color: #fff;
`;

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const InputField = styled(Form.Control)`
  margin: 20px 0;
  border-radius: 5px;
`;

function ChooseMethod() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paypalAmount, setPaypalAmount] = useState(null);
  const [permission, setPermission] = useState(false);
  
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token || tokenObject;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const handlePaypalClick = () => {
    dispatch(setAmount(paypalAmount));
    navigate('/paypal');
  };

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <StyledContainer>
      {permission ? (
        <StyledCard className="p-4">
          <h2>Select Payment Method</h2>
          <InputField
            placeholder="Enter the amount you want to pay"
            type="number"
            onChange={(e) => setPaypalAmount(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <Button variant="outline-primary" onClick={() => navigate('/stripe')}>
              Stripe
            </Button>
            <Button variant="primary" onClick={handlePaypalClick}>
              PayPal
            </Button>
          </div>
        </StyledCard>
      ) : (
        <div className="mt-5">
          <Card style={{ backgroundColor: 'black', color: 'white' }}>
            <Card.Body className="text-center">
              <h5>Please sign up/in to proceed.</h5>
              <Button variant="light" onClick={navigateSignUpIn}>
                Sign Up/In
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </StyledContainer>
  );
}

export default ChooseMethod;
