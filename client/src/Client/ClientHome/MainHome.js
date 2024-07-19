import React, { useEffect, useState } from 'react';
import CallInviteBlocks from './CallInviteBlocks';
import TopBar from './TopBar';
import ImgSlider from './ImgSlider';
import RelatedTeachers from './RelatedTeachers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button as BootstrapButton } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainHome() {
  const [permission, setPermission] = useState(false);
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token || tokenObject;

  const navigate = useNavigate();

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

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <MainContainer>
      {permission ? (
        <>
          <TopBar />
          <ImgSlider />
          <CallInviteBlocks />
          <RelatedTeachers />
        </>
      ) : (
        <SignUpContainer>
          <Card className="sign-up-card">
            <BootstrapButton onClick={navigateSignUpIn}>Sign Up/In</BootstrapButton>
          </Card>
        </SignUpContainer>
      )}
    </MainContainer>
  );
}

export default MainHome;

const MainContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding-bottom: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
`;

const SignUpContainer = styled.div`
  position: relative;
  top: 170px;
  background-color: #fff;
  height: 200px;
  width: 80%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  .sign-up-card {
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  button {
    background-color: #007bff;
    border: none;
    &:hover {
      background-color: #0056b3;
    }
  }
`;
