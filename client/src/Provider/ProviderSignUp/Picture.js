import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #004e92; /* Blue background */
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainCard = styled(Card)`
  background-color: black;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 24px;
  color: white;
  margin-top: 20px;
`;

const UploadButton = styled(Button)`
  width: 100%;
  margin: 20px 0;
`;

const ImagePreview = styled.img`
  display: block;
  margin: 20px auto;
  width: 140px;
  height: 140px;
  border-radius: 20px;
`;

function Picture() {
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/type-of-work");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picture', e);
    formData.append('name', 'image/png');
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPicture', formData);
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>A Nice Profile Picture</b>
          </Title>
          <Form style={{ padding: '20px' }}>
            <UploadButton as="label" htmlFor="file-upload">
              Choose a Picture
              <input
                type="file"
                id="file-upload"
                name="picture"
                onChange={(e) => handleUpload(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </UploadButton>
            {picture && <ImagePreview src={URL.createObjectURL(picture)} alt="Preview" />}

            <UploadButton onClick={handleNextClick}>Next</UploadButton>
          </Form>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default Picture;
