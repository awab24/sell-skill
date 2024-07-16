import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from './TopBar';
import Jobs from './Jobs';
import ImgSlider from './ImgSlider';
import 'bootstrap/dist/css/bootstrap.min.css';

function PMainHome() {
  const [permission, setPermission] = useState(false);
  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider', {
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
    <div style={{ background: 'blue', minHeight: '100vh', paddingBottom: '360px' }}>
      {permission ? (
        <Container>
          <TopBar />
          <ImgSlider />
          <Jobs />
        </Container>
      ) : (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Card className="text-center p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'black' }}>
            <Card.Body>
              <Button variant="outline-light" onClick={navigateSignUpIn}>
                Sign Up/In
              </Button>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default PMainHome;
