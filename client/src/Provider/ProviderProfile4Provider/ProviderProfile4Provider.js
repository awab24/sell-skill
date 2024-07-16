import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import {v4 as uuidv4} from 'uuid'

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

function ProviderProfile4Provider() {
  const [fileSrc, setFileSrc] = useState('');
  const [experienceImageSrcs, setExperienceImageSrcs] = useState([]);
  const [experiencePdfSrcs, setExperiencePdfSrcs] = useState([]);
  const [blog, setBlog] = useState('');
  const [name, setName] = useState('');
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [permission, setPermission] = useState(false);
  const [certificateImagesSrcs, setCertificateImagesSrcs] = useState([]);
  const [certificatePdfSrcs, setCertificatePdfSrcs] = useState([]);
  const [reports, setReports] = useState([])
  const [paypalEmail, setPaypalEmail] = useState('')

  

  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  let token = tokenObject.token;
  if (!token) {
    token = tokenObject;
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.permission);
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, []);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileIMAGE');
        const imagesData = response.data.map((image) => {
          console.log('image certification id ====> '+ image.imageCertificationId)
          return {imageSrc: `data:${image.contentType};base64,${image.data}`, imageId: image.imageCertificationId};
        });
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
        const certificatePdfs = response.data.map((certificatePdf) => {
          return {certificatePdfSrc: `data:${certificatePdf.contentType};base64,${certificatePdf.data}`, certificatePdfId: certificatePdf.id};
        });
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
        const pdfExperiences = response.data.map((pdfExperience) => {
          return {src: `data:${pdfExperience.contentType};base64,${pdfExperience.data}`, id: pdfExperience.id};
        });
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
        const imageExperiences = response.data.map((imageExperience) => {
          return {src: `data:${imageExperience.contentType};base64,${imageExperience.data}`, id: imageExperience.id}
        });
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
        
        const base64 = Buffer.from(response?.data, 'binary').toString('base64');
        const mimeType = response?.headers['content-type'];
        console.log('Blog mimeType: ' + mimeType);
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

  const handleChangePaypalEmail = async() => {
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPaypalEmail', {paypalEmail:paypalEmail})
  }

  const handleImageCertification = async (e) => {
    const formData = new FormData();
    formData.append('image', e);
    formData.append('id', uuidv4())
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageCertificate', formData);
  };
  
  const handlePdfCertification = async (e) => {
    const formData = new FormData();
    formData.append('pdf', e);
    formData.append('name', 'application/pdf');
    formData.append('id', uuidv4())
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfCertificate', formData);
  };

  const handlePDFExperience = async (e) => {
    const formData = new FormData();
    formData.append('experiencePdf', e);
    formData.append('id', uuidv4())
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfExperience', formData);
  };

  const handleIMAGEExperience = async (e) => {
    const formData = new FormData();
    formData.append('experienceImage', e);
    formData.append('id', uuidv4())
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageExperience', formData);
  };

  const deleteImageCertificate = async(e) => {
    console.log('e ===> '+e)
    await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteImageCertificate/'+e)
  }
  const deletePdfCertificate = async(e) => {
    await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deletePdfCertificate/'+e)
  }

  const deleteImageExperience = async(e) => {
    console.log('imageExperience id ==> ==> '+e)
    await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteImageExperience/'+e)

  }
  const deletePdfExperience = async(e) => {
    await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deletePdfExperience/'+e)
  }

  useEffect(() => {
    const fetchReports = async() => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getReport')
      setReports(response.data)
      console.log('reports ===> '+response.data)
    }
    fetchReports();
  },[])
  
  const deleteBlog = async() => {
    await axios.patch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteBlog')
  }


  const addBlog = async(e) => {
    const formData = new FormData()
    
    formData.append('image', e)
    formData.append('name', 'image/png')
    console.log(formData)
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/addBlog' , formData)
  }
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
              <SectionTitle>definiytion blogs</SectionTitle>

              {
                blog !== 'data:undefined;base64,' ?              ( <>    
             
                   <Image src={blog}/>
                <Button onClick = {deleteBlog}><FaTrash/>Delete blog</Button>
                </>) : (<Button ><input type="file" name ="image"  onChange={(e) => addBlog(e.target.files[0])}/></Button>)
              }




            </Section>

            <Section>
              <SectionTitle>Provider Certifications</SectionTitle>
              {certificateImagesSrcs.length > 0 ? (
                certificateImagesSrcs.map((imageSrc, index) => (
                  <>
                  <Image key={index} src={imageSrc.imageSrc} alt={`Certification ${index + 1}`} />
                  <Button onClick={() => deleteImageCertificate(imageSrc.imageId)}>
                      <FaTrash/> Delete certificate
                  </Button>
                  </>

                ))
              ) : (
                <div>No image certifications</div>
              )}
              <input type="file" name="image" onChange={(e) => handleImageCertification(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Certification PDF</SectionTitle>
              <PdfEmbed src={fileSrc} type="application/pdf" />
              {certificatePdfSrcs.length > 0 ? (
                certificatePdfSrcs.map((pdfSrc, index) => (
                  <>
                  <PdfEmbed src={pdfSrc.certificatePdfSrc} type="application/pdf" key={index} />
                  <Button onClick={() => deletePdfCertificate(pdfSrc.certificatePdfId)}>
                    <FaTrash /> Delete certificate
                  </Button>
                  </>

                ))
              ) : (
                <div>No PDF certifications</div>
              )}
              <input type="file" name="pdf" onChange={(e) => handlePdfCertification(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Experience</SectionTitle>
              {experienceImageSrcs.length > 0 ? (
                experienceImageSrcs.map((experienceImageSrc, index) => (
                  <>
                  <Image src={experienceImageSrc.src} key={index} alt={`Experience ${index + 1}`} />
                  <Button onClick={() => deleteImageExperience(experienceImageSrc.id)}>
                    <FaTrash /> Delete experience
                  </Button>
                  </>

                ))
              ) : (
                <div>No experience images</div>
              )}
              <input type="file" name="image" onChange={(e) => handleIMAGEExperience(e.target.files[0])} />
            </Section>

            <Section>
              <SectionTitle>Provider Experience PDF</SectionTitle>
              {experiencePdfSrcs.length > 0 ? (
                experiencePdfSrcs.map((pdfExperienceSrc, index) => (
                  <>
                  <PdfEmbed src={pdfExperienceSrc.src}  type="application/pdf" />
                  <Button onClick={() => deletePdfExperience(pdfExperienceSrc.id)}>
                    <FaTrash />Delete experience
                  </Button>
                  </>

                ))
              ) : (
                <div>No experience PDFs</div>
              )}
              <input type="file" name="pdf" onChange={(e) => handlePDFExperience(e.target.files[0])} />
            </Section>

            <Section>
        
                {
                  reports.length > 0 ? reports.map((report) => <div>{report?.report.report}</div>):<div>No reports</div>
                }
         
            </Section>
            <input placeholder='change paypal email' onChange={(e) => setPaypalEmail(e.target.value)}/>
            <Button onClick = {handleChangePaypalEmail}>change Paypal email</Button>
          </Container>
        </>
      ) : (
        <div
          style={{
            position: 'relative',
            top: '170px',
            left: '270px',
            backgroundColor: 'black',
            height: '200px',
            width: '800px',
          }}
        >
          <Card style={{ width: '400px', position: 'relative', top: '50px', left: '190px' }}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </>
  );
}

export default ProviderProfile4Provider;
