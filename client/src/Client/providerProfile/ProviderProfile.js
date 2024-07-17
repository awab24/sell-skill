import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(to bottom, #000428, #004e92);
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Section = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #004e92;
  font-size: 28px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
`;

const HeaderTitle = styled.h1`
  margin-bottom: 20px;
  color: #004e92;
  font-size: 36px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid #004e92;
  margin-bottom: 20px;
`;

const PdfEmbed = styled.embed`
  width: 100%;
  height: 600px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
`;

const Video = styled.video`
  width: 100%;
  height: 600px;
  border-radius: 12px;
  border: 1px solid #dee2e6;
`;

function ProviderProfile() {
  const [imageSrc, setImageSrc] = useState('');
  const [fileSrc, setFileSrc] = useState('');
  const [experienceImageSrc, setExperienceImageSrc] = useState('');
  const [experiencePdfSrc, setExperiencePdfSrc] = useState('');
  const [introVideo, setIntroVideo] = useState('');
  const [name, setName] = useState('');
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [permission, setPermission] = useState(false);
  const [reports, setReports] = useState([]);

  let token = localStorage.getItem('clientToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/getReport');
      setReports(response.data);
    };
    fetchReports();
  }, []);

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  const fetchImage = async (url, setter) => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      const mimeType = response.headers['content-type'];
      setter(`data:${mimeType};base64,${base64}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchImage('https://sell-skill.com/api/endpoints/getProfileIMAGE', setImageSrc);
    fetchImage('https://sell-skill.com/api/endpoints/getProfilePDF', setFileSrc);
    fetchImage('https://sell-skill.com/api/endpoints/getExperiencePDF', setExperiencePdfSrc);
    fetchImage('https://sell-skill.com/api/endpoints/getExperienceIMAGE', setExperienceImageSrc);
    fetchImage('https://sell-skill.com/api/endpoints/getIntro', setIntroVideo);
    fetchImage('https://sell-skill.com/api/endpoints/getProfilePicture', setProfileImageSrc);
  }, [name]);

  useEffect(() => {
    fetch('https://sell-skill.com/api/endpoints/getProfileData')
      .then(response => response.json())
      .then(result => setName(result.name));
  }, []);

  return (
    <>
      <GlobalStyle />
      {permission ? (
        <Container>
          <Section>
            <HeaderTitle>Provider: {name}</HeaderTitle>
            <ProfileImage src={profileImageSrc} alt="Profile" />
          </Section>

          <Section>
            <SectionTitle>Intro Video</SectionTitle>
            <Video src={introVideo} controls />
          </Section>

          <Section>
            <SectionTitle>Provider Certifications</SectionTitle>
            <Image src={imageSrc} alt="Provider Certification" />
          </Section>

          <Section>
            <SectionTitle>Provider Certification PDF</SectionTitle>
            <PdfEmbed src={fileSrc} type="application/pdf" />
          </Section>

          <Section>
            <SectionTitle>Provider Experience</SectionTitle>
            <Image src={experienceImageSrc} alt="Provider Experience" />
          </Section>

          <Section>
            <SectionTitle>Provider Experience PDF</SectionTitle>
            <PdfEmbed src={experiencePdfSrc} type="application/pdf" />
          </Section>
        </Container>
      ) : (
        <div style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </>
  );
}

const styles = {
  permissionContainer: {
    position: 'relative',
    top: '170px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'black',
    height: '200px',
    width: '800px',
  },
  permissionCard: {
    width: '400px',
    position: 'relative',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};

export default ProviderProfile;
