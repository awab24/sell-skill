import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewSkills } from '../../reducers/reducers';
import axios from 'axios';

function Skills() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPostData = useSelector((state) => state.allow.overview);
  const [postData, setPostData] = useState(previousPostData);
  const [other, setOther] = useState('');
  const [permission, setPermission] = useState(false);
  
  let token;
  const tokenString = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(tokenString);
  token = tokenObject.token || tokenObject;

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

  const handleNextClick = () => {
    dispatch(setOverviewSkills(postData));
    navigate("/posting-scope");
  };

  const handleCategoryClick = (cat) => {
    setPostData((prevData) => ({
      ...prevData,
      skills: prevData.skills.includes(cat) ? prevData.skills.filter(skill => skill !== cat) : [...prevData.skills, cat],
    }));
  };

  const handleAddOther = () => {
    if (other.trim() && !postData.skills.includes(other)) {
      setPostData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, other],
      }));
      setOther('');
    }
  };

  return (
    <div style={styles.container}>
      {permission ? (
        <Container>
          <Card style={styles.outerCard}>
            <Card style={styles.innerCard}>
              <Card.Title style={styles.title}>
                <b>Skills</b>
              </Card.Title>
              <div style={styles.buttonsContainer}>
                {['Coding', 'AI', 'Medicne', 'Engineering', 'Law', 'Buisness', 'Trading', 'Cryptocurrecny', 'Youtube improvement', 'Brain Storming', 'Self disipline', 'Fitness','Self improvement','Time management', 'Dropshipping'].map((skill) => (
                  <Button
                    key={skill}
                    style={postData.skills.includes(skill) ? styles.selectedButton : styles.button}
                    onClick={() => handleCategoryClick(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              <Form.Control
                type="text"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="Enter another field..."
                style={styles.input}
              />
              <Button style={styles.button} onClick={handleAddOther}>Add Other</Button>
              <Button style={styles.nextButton} onClick={handleNextClick}>Next</Button>
            </Card>
          </Card>
        </Container>
      ) : (
        <div style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f0f8ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  outerCard: {
    backgroundColor: '#000',
    color: '#00f',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  innerCard: {
    backgroundColor: '#00f',
    color: '#000',
    borderRadius: '20px',
    padding: '20px',
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    width: '48%',
    margin: '5px',
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
  },
  selectedButton: {
    width: '48%',
    margin: '5px',
    backgroundColor: '#00f',
    borderColor: '#000',
    color: '#000',
  },
  input: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '5px',
  },
  nextButton: {
    display: 'block',
    width: '100%',
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
    borderRadius: '5px',
  },
  permissionContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  permissionCard: {
    padding: '20px',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '10px',
  },
};

export default Skills;
