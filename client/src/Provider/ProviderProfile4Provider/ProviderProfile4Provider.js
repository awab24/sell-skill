import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

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

const ProviderProfile4Provider = () => {
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

  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  let token = tokenObject?.token || tokenObject;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider', {
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
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileIMAGE');
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
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfilePDF');
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
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getExperiencePDF');
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
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getExperienceIMAGE');
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
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getBlog', {
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
    fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileData')
      .then((response) => response.json())
      .then((result) => setName(JSON.stringify(result.name).replace(/"/g, '')));
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfilePicture', {
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

  const handleChangePaypalEmail = async () => {
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPaypalEmail', { paypalEmail });
  };

  const handleImageCertification = async (e) => {
    const formData = new FormData();
    formData.append('image', e);
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageCertificate', formData);
  };

  const handlePdfCertification = async (e) => {
    const formData = new FormData();
    formData.append('pdf', e);
    formData.append('name', 'application/pdf');
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfCertificate', formData);
  };

  const handlePDFExperience = async (e) => {
    const formData = new FormData();
    formData.append('experiencePdf', e);
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfExperience', formData);
  };

  const handleIMAGEExperience = async (e) => {
    const formData = new FormData();
    formData.append('experienceImage', e);
    formData.append('id', uuidv4());
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageExperience', formData);
  };

  const deleteImageCertificate = async (id) => {
    await axios.delete(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteImageCertificate/${id}`);
  };

  const deletePdfCertificate = async (id) => {
    await axios.delete(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deletePdfCertificate/${id}`);
  };

  const deleteImageExperience = async (id) => {
    await axios.delete(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteImageExperience/${id}`);
  };

  const deletePdfExperience = async (id) => {
    await axios.delete(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deletePdfExperience/${id}`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getReport');
      setReports(response.data);
    };
    fetchReports();
  }, []);

  const deleteBlog = async () => {
    await axios.patch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteBlog');
  };

  const addBlog = async (e) => {
    const formData = new FormData();
    formData.append('image', e);
    formData.append('name', 'image/png');
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/addBlog', formData);
  };

  return (
    <>
      {permission ? (
        <>
          <GlobalStyle />
          <Container>
            <Section>
              <HeaderTitle>Provider: {name}</HeaderTitle>
              {
                profileImageSrc && 
                <ProfileImage src={profileImageSrc} alt="Profile" />
              }

            </Section>

            <Section>
              <SectionTitle>Definition Blogs</SectionTitle>
              {blog !== 'data:undefined;base64,' ? (
                <>
                  <Image src={blog} alt="Blog" />
                  <Button onClick={deleteBlog}>
                    <FaTrash /> Delete Blog
                  </Button>
                </>
              ) : (
                <Button>
                  <FileInput type="file" name="image" onChange={(e) => addBlog(e.target.files[0])} />
                </Button>
              )}
            </Section>

            <Section>
              <SectionTitle>Provider Certifications</SectionTitle>
              {certificateImagesSrcs.length > 0 ? (
                certificateImagesSrcs.map((imageSrc, index) => (
                  <div key={index}>
                    {
                      imageSrc && 
                      <>
                      <Image src={imageSrc.imageSrc} alt={`Certification ${index + 1}`} />
                      <Button onClick={() => deleteImageCertificate(imageSrc.imageId)}>
                        <FaTrash /> Delete Certificate
                      </Button> 
                      </>

                    }

                  </div>
                ))
              ) : (
                <div>No image certifications</div>
              )}
              <FileInput type="file" name="image" onChange={(e) => handleImageCertification(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Certification PDF</SectionTitle>
              <PdfEmbed src={fileSrc} type="application/pdf" />
              {certificatePdfSrcs.length > 0 ? (
                certificatePdfSrcs.map((pdfSrc, index) => (
                  <div key={index}>
                    {
                      pdfSrc && <>
                                        <PdfEmbed src={pdfSrc.certificatePdfSrc} type="application/pdf" />
                    <Button onClick={() => deletePdfCertificate(pdfSrc.certificatePdfId)}>
                      <FaTrash /> Delete Certificate
                    </Button>  
                      </>
                    }

                  </div>
                ))
              ) : (
                <div>No PDF certifications</div>
              )}
              <FileInput type="file" name="pdf" onChange={(e) => handlePdfCertification(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Experience</SectionTitle>
              {experienceImageSrcs.length > 0 ? (
                experienceImageSrcs.map((experienceImageSrc, index) => (
                  <div key={index}>
                    {
                      experienceImageSrc && <>
                                          <Image src={experienceImageSrc.src} alt={`Experience ${index + 1}`} />
                    <Button onClick={() => deleteImageExperience(experienceImageSrc.id)}>
                      <FaTrash /> Delete Experience
                    </Button>
                      </>
                    }

                  </div>
                ))
              ) : (
                <div>No experience images</div>
              )}
              <FileInput type="file" name="image" onChange={(e) => handleIMAGEExperience(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Experience PDF</SectionTitle>
              {experiencePdfSrcs.length > 0 ? (
                experiencePdfSrcs.map((pdfExperienceSrc, index) => (
                  <div key={index}>
                    {
                      pdfExperienceSrc && 
                      <>
                                          <PdfEmbed src={pdfExperienceSrc.src} type="application/pdf" />
                    <Button onClick={() => deletePdfExperience(pdfExperienceSrc.id)}>
                      <FaTrash /> Delete Experience
                    </Button>
                      </>
                    }

                  </div>
                ))
              ) : (
                <div>No experience PDFs</div>
              )}
              <FileInput type="file" name="pdf" onChange={(e) => handlePDFExperience(e.target.files[0])} />
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
              <Button onClick={handleChangePaypalEmail}>Change PayPal Email</Button>
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

export default ProviderProfile4Provider;
