import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled, { createGlobalStyle } from 'styled-components';
import { useFetcher, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(to bottom, #000428, #004e92); /* Black to blue gradient background */
    color: #ffffff; /* White text for contrast */
    font-family: Arial, Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  color: #333; /* Dark text for contrast */
`;

const Section = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #004e92; /* Blue text for section titles */
  font-size: 24px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
`;

const HeaderTitle = styled.h1`
  margin-bottom: 20px;
  color: #004e92; /* Blue text for header title */
  font-size: 36px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
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
  border-radius: 8px;
`;

const Video = styled.video`
  width: 100%;
  height: 600px;
  border-radius: 8px;
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
  const [permission, setPermission] = useState(false) 
  const [reports, setReports] = useState([])


let token; 
const tokenString = localStorage.getItem('clientToken') 
const tokenObject = JSON.parse(tokenString) 
token = tokenObject.token 
if(!token){ 
  token = tokenObject 
} 
console.log('token from mainHome => '+ token) 
const navigate = useNavigate() 
 



  
  useEffect(() => {
    const fetchReports = async() => {
      const response = await axios.get('http://localhost:5000/api/endpoints/getReport')
      setReports(response.data)
      console.log('reports ===> '+response.data)
    }
    fetchReports();
  },)

  
  

 
  useEffect(() => { 
    const fetchPermission = async() => { 
      const response = await axios.get('http://localhost:5000/api/endpoints/verifyClient',{headers: 
        { 
         Authorization:  
           `Bearer ${token}`
          
        } 
        } 
       
        ) 
      console.log(response.data.permission) 
      setPermission(response.data.permission) 
  
    } 
fetchPermission(); 
  }, []) 
 
 
const navigateSignUpIn = () => { 
  navigate('/auth') 
}

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getProfileIMAGE', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setImageSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImage();
  }, []);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getProfilePDF', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setFileSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPdf();
  }, []);

  useEffect(() => {
    const fetchExperiencePdf = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getExperiencePDF', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setExperiencePdfSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExperiencePdf();
  }, []);

  useEffect(() => {
    const fetchExperienceImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getExperienceIMAGE', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setExperienceImageSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExperienceImage();
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getIntro', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        console.log('video mimeType: ' + mimeType);
        setIntroVideo(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/endpoints/getProfileData').then(
      response => response.json()
    ).then(
      result => setName(JSON.stringify(result.name).replace(/"/g, ""))
    )
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/endpoints/getProfilePicture', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setProfileImageSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImage();
  }, [name]);

  return (
    <>
    {
      permission ? (<>
            <GlobalStyle />
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
      </>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
    }

    </>
  );
}

export default ProviderProfile;
