import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

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
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: #004e92;
  font-size: 24px;
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
  border-radius: 8px;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: block;
  margin: 10px auto;
`;

const CertainProvider = () => {
  const [fileSrc, setFileSrc] = useState('');
  const [experienceImageSrcs, setExperienceImageSrcs] = useState([]);
  const [experiencePdfSrcs, setExperiencePdfSrcs] = useState([]);
  const [blog, setBlog] = useState('');
  const [name, setName] = useState('');
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [permission, setPermission] = useState(false);
  const [certificateImagesSrcs, setCertificateImagesSrcs] = useState([]);
  const [certificatePdfSrcs, setCertificatePdfSrcs] = useState([]);
  const [reports, setReports] = useState([]);
  const [paypalEmail, setPaypalEmail] = useState('');
  const providerId = useSelector((state) => state.allow.providerId)
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  let token = tokenObject?.token || tokenObject;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileIMAGE4Client/'+providerId);
        const imagesData = response.data.map((image) => ({
          imageSrc: `data:${image.contentType};base64,${image.data}`,
          imageId: image.imageCertificationId,
        }));
        setCertificateImagesSrcs(imagesData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfilePDF4Client/'+providerId);
        const certificatePdfs = response.data.map((certificatePdf) => ({
          certificatePdfSrc: `data:${certificatePdf.contentType};base64,${certificatePdf.data}`,
          certificatePdfId: certificatePdf.id,
        }));
        setCertificatePdfSrcs(certificatePdfs);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPdf();
  }, []);

  useEffect(() => {
    const fetchExperiencePdf = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getExperiencePDF4Client/'+providerId);
        const pdfExperiences = response.data.map((pdfExperience) => ({
          src: `data:${pdfExperience.contentType};base64,${pdfExperience.data}`,
          id: pdfExperience.id,
        }));
        setExperiencePdfSrcs(pdfExperiences);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExperiencePdf();
  }, []);

  useEffect(() => {
    const fetchExperienceImage = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getExperienceIMAGE4Client/'+providerId);
        const imageExperiences = response.data.map((imageExperience) => ({
          src: `data:${imageExperience.contentType};base64,${imageExperience.data}`,
          id: imageExperience.id,
        }));
        setExperienceImageSrcs(imageExperiences);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExperienceImage();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getBlog4Client/'+providerId, {
          responseType: 'arraybuffer',
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setBlog(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileData4Client/'+providerId)
      .then((response) => response.json())
      .then((result) => setName(JSON.stringify(result.name).replace(/"/g, '')));
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfilePicture4Client/'+providerId, {
          responseType: 'arraybuffer',
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








 
  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getReport4Client/'+providerId);
      setReports(response.data);
    };
    fetchReports();
  }, []);




  return (
    <>
      {permission ? (
        <>
          <GlobalStyle />
          <Container>
            <Section>
              <HeaderTitle>Provider: {name}</HeaderTitle>
              <ProfileImage src={profileImageSrc} alt="Profile" />
            </Section>

            <Section>
              <SectionTitle>Definition Blogs</SectionTitle>
     
                {
                  blog && 
                  <Image src={blog} alt="Blog" />
                }

          
                        
            </Section>

            <Section>
              <SectionTitle>Provider Certifications</SectionTitle>
              {certificateImagesSrcs.length > 0 ? (
                certificateImagesSrcs.map((imageSrc, index) => (
                  <div key={index}>
                    {
                      imageSrc && 
                      <Image src={imageSrc.imageSrc} alt={`Certification ${index + 1}`} />
                    }


                  </div>
                ))
              ) : (
                <div>No image certifications</div>
              )}

            </Section>

            <Section>
              <SectionTitle>Provider Certification PDF</SectionTitle>
              <PdfEmbed src={fileSrc} type="application/pdf" />
              {certificatePdfSrcs.length > 0 ? (
                certificatePdfSrcs.map((pdfSrc, index) => (
                  <div key={index}>
                    {
                      pdfSrc && 
                      <PdfEmbed src={pdfSrc.certificatePdfSrc} type="application/pdf" />
                    }


                  </div>
                ))
              ) : (
                <div>No PDF certifications</div>
              )}

            </Section>

            <Section>
              <SectionTitle>Provider Experience</SectionTitle>
              {experienceImageSrcs.length > 0 ? (
                experienceImageSrcs.map((experienceImageSrc, index) => (
                  <div key={index}>
                    {
                      experienceImageSrc && 
                      <Image src={experienceImageSrc.src} alt={`Experience ${index + 1}`} />
                    }


                  </div>
                ))
              ) : (
                <div>No experience images</div>
              )}

            </Section>

            <Section>
              <SectionTitle>Provider Experience PDF</SectionTitle>
              {experiencePdfSrcs.length > 0 ? (
                experiencePdfSrcs.map((pdfExperienceSrc, index) => (
                  <div key={index}>
                    {
                      pdfExperienceSrc && 
                      <PdfEmbed src={pdfExperienceSrc.src} type="application/pdf" />
                    }


                  </div>
                ))
              ) : (
                <div>No experience PDFs</div>
              )}

            </Section>

            <Section>
              {reports.length > 0 ? (
                reports.map((report, index) => <div key={index}>{report?.report?.report}</div>)
              ) : (
                <div>No reports</div>
              )}
            </Section>

            <Section>
              <input
                placeholder="Change PayPal Email"
                onChange={(e) => setPaypalEmail(e.target.value)}
                style={{ padding: '10px', width: '80%', borderRadius: '4px', margin: '10px auto' }}
              />

            </Section>
          </Container>
        </>
      ) : (
        <div style={{ position: 'relative', top: '170px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'black', height: '200px', width: '80%', maxWidth: '800px', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <Card style={{ margin: '0 auto', padding: '20px' }}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default CertainProvider;
