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
  padding: 20px;
`;

const MainCard = styled(Card)`
  background-color: #2c2c2c;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 20px;
`;

const UploadButton = styled(Button)`
  width: 100%;
  margin: 20px 0;
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: block;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const ImagePreview = styled.img`
  display: block;
  margin: 20px auto;
  width: 140px;
  height: 140px;
  border-radius: 20px;
  object-fit: cover;
`;

function Picture() {
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/type-of-work");
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('picture', e);
    formData.append('name', 'image/png');
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPicture', formData);
    setPicture(e);
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>A Nice Profile Picture</Title>
          <Form>
            <UploadButton as="label" htmlFor="file-upload">
              Choose a Picture
              <Input
                type="file"
                id="file-upload"
                name="picture"
                onChange={(e) => handleUpload(e.target.files[0])}
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
