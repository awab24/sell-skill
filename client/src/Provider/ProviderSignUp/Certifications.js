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
    color: #ffffff;
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
  color: blue;
  border-radius: 40px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 30px;
  color: black;
  margin-top: 20px;
`;

const UploadCard = styled(Card)`
  background-color: black;
  color: white;
  width: 200px;
  height: 110px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
`;

const ImagePreview = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 40px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  };

  const handleIMAGE = async (e) => {
    const formData = new FormData();
    formData.append('image', e);
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageCertificate', formData);
  };

  const handleNextClick = async () => {
    navigate('/previous-experience');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Certifications Here</b>
          </Title>
          <UploadCard onClick={() => document.getElementById('image-upload').click()}>
            <b>Upload IMAGE</b>
          </UploadCard>
          <input
            id="image-upload"
            type="file"
            name="image"
            accept="image/png"
            onChange={(e) => {
              handleIMAGE(e.target.files[0]);
              setImageCertificate(e.target.files[0]);
            }}
            style={{ display: 'none' }}
          />
          {imageCertificate && <ImagePreview src={URL.createObjectURL(imageCertificate)} />}
          
          <UploadCard onClick={() => document.getElementById('pdf-upload').click()} style={{ marginTop: '10px' }}>
            <b>Upload PDF</b>
          </UploadCard>
          <input
            id="pdf-upload"
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={(e) => handlePDF(e.target.files[0])}
            style={{ display: 'none' }}
          />

          <Button onClick={handleNextClick} style={{ marginTop: '20px', width: '100%' }}>
            Next
          </Button>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default Certifications;
