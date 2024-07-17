import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  margin-top: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled(Card.Title)`
  text-align: center;
  font-size: 30px;
  color: black;
  margin-top: 20px;
`;

const FileButton = styled(Button)`
  width: 150px;
  margin: 20px auto;
  display: block;
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

function Blog() {
  const navigate = useNavigate();
  const [intro, setIntro] = useState('');

  const handleAddBlog = async (e) => {
    const formData = new FormData();
    setIntro(e);
    formData.append('image', e);
    formData.append('name', 'image/png');
    await axios.post('https://sell-skill.com/api/endpoints/addBlog', formData);
  };

  const handleNextClick = async () => {
    navigate('/rate-per-hour');
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <MainCard>
          <Title>
            <b>Intro video or you can do it later</b>
          </Title>
          <Card.Body className="text-center">
            <FileButton>
              <b>Image blog</b>
              <input
                type="file"
                name="image"
                onChange={(e) => handleAddBlog(e.target.files[0])}
                style={{ display: 'block', marginTop: '10px' }}
              />
            </FileButton>
            {intro && <ImagePreview src={URL.createObjectURL(intro)} />}
            <Button onClick={handleNextClick} style={{ marginTop: '20px', width: '100%' }}>
              Next
            </Button>
          </Card.Body>
        </MainCard>
      </StyledContainer>
    </>
  );
}

export default Blog;
