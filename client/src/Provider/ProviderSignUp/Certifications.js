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

function Certifications() {
  const [pdfCertificate, setPdfCertificate] = useState(null);
  const [imageCertificate, setImageCertificate] = useState(null);
  const navigate = useNavigate();

  const handlePDF = async (e) => {
    const formData = new FormData();
    formData.append('pdf', e);
    formData.append('name', 'application/pdf');
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfCertificate', formData);
    setPdfCertificate(e);
  };

  const handleIMAGE = async (e) => {
    const formData = new FormData();
    formData.append('image', e);
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageCertificate', formData);
    setImageCertificate(e);
  };

  const handleNextClick = async () => {
    navigate('/previous-experience');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>Certifications Here</Title>
          <UploadCard onClick={() => document.getElementById('image-upload').click()}>
            <b style={{ color: 'white' }}>Upload IMAGE</b>
          </UploadCard>
          <Input
            id="image-upload"
            type="file"
            name="image"
            accept="image/png"
            onChange={(e) => {
              handleIMAGE(e.target.files[0]);
              setImageCertificate(e.target.files[0]);
            }}
          />
          {imageCertificate && <ImagePreview src={URL.createObjectURL(imageCertificate)} />}
          
          <UploadCard onClick={() => document.getElementById('pdf-upload').click()} style={{ marginTop: '10px' }}>
            <b style={{ color: 'white' }}>Upload PDF</b>
          </UploadCard>
          <Input
            id="pdf-upload"
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={(e) => handlePDF(e.target.files[0])}
          />

          <UploadButton onClick={handleNextClick}>Next</UploadButton>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default Certifications;
