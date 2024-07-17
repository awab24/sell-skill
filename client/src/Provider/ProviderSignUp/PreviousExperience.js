import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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

const UploadCard = styled(Card)`
  background-color: #3d3d3d;
  margin: 10px 0;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #4a4a4a;
  }
`;

const UploadButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
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

function PreviousExperience() {
  const [pdfExperience, setPdfExperience] = useState(null);
  const [imageExperience, setImageExperience] = useState(null);
  const navigate = useNavigate();

  const handlePDF = async (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('id', uuidv4());

    await axios.post('https://sell-skill.com/api/endpoints/insertPdfExperience', formData);
  };

  const handleIMAGE = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', uuidv4());

    await axios.post('https://sell-skill.com/api/endpoints/insertImageExperience', formData);
  };

  const handleNextClick = () => {
    navigate('/blog');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>Previous Experience</Title>
          <UploadCard>
            <b style={{ color: 'white' }}>Upload Image</b>
            <Input
              type="file"
              id="image-upload"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImageExperience(e.target.files[0]);
                handleIMAGE(e.target.files[0]);
              }}
            />
            <Label htmlFor="image-upload">Choose Image</Label>
          </UploadCard>
          <UploadCard>
            <b style={{ color: 'white' }}>Upload PDF</b>
            <Input
              type="file"
              id="pdf-upload"
              name="pdf"
              accept="application/pdf"
              onChange={(e) => {
                setPdfExperience(e.target.files[0]);
                handlePDF(e.target.files[0]);
              }}
            />
            <Label htmlFor="pdf-upload">Choose PDF</Label>
          </UploadCard>
          {imageExperience && (
            <ImagePreview src={URL.createObjectURL(imageExperience)} alt="Preview" />
          )}
          <UploadButton onClick={handleNextClick}>Next</UploadButton>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default PreviousExperience;
