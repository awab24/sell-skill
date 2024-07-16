import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
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

const UploadCard = styled(Card)`
  background-color: black;
  margin: 20px;
  padding: 10px;
`;

const UploadButton = styled(Button)`
  width: 100%;
  margin: 10px 0;
`;

const ImagePreview = styled.img`
  display: block;
  margin: 20px auto;
  width: 140px;
  height: 140px;
  border-radius: 20px;
`;

function PreviousExperience() {
  const [pdfExperience, setPdfExperience] = useState(null);
  const [imageExperience, setImageExperience] = useState(null);
  const navigate = useNavigate();

  const handlePDF = async (e) => {
    const formData = new FormData();
    formData.append('experiencePdf', e);
    formData.append('id', uuidv4());

    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfExperience', formData);
  };

  const handleIMAGE = async (e) => {
    const formData = new FormData();
    formData.append('experienceImage', e);
    formData.append('id', uuidv4());

    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageExperience', formData);
  };

  const handleNextClick = () => {
    navigate('/blog');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Previous Experience</b>
          </Title>

          <UploadCard onClick={handleIMAGE}>
            <b style={{ color: 'white', textAlign: 'center' }}>Upload Image</b>
            <input
              type="file"
              name="experienceImage"
              accept="image/png"
              onChange={(e) => {
                setImageExperience(e.target.files[0]);
                handleIMAGE(e.target.files[0]);
              }}
              style={{ display: 'none' }}
            />
          </UploadCard>

          <UploadCard onClick={handlePDF}>
            <b style={{ color: 'white', textAlign: 'center' }}>Upload PDF</b>
            <input
              type="file"
              name="experiencePdf"
              accept="application/pdf"
              onChange={(e) => {
                setPdfExperience(e.target.files[0]);
                handlePDF(e.target.files[0]);
              }}
              style={{ display: 'none' }}
            />
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
