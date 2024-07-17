import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewTitle } from '../../reducers/reducers';
import axios from 'axios';

function Title() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPostData = useSelector((state) => state.allow.overview);
  const [postData, setPostData] = useState(previousPostData);
  const [permission, setPermission] = useState(false);

  let token = localStorage.getItem('clientToken');
  const tokenObject = JSON.parse(token);
  token = tokenObject.token || tokenObject;

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermission(response.data.permission);
    };
    fetchPermission();
  }, [token]);

  const handleNextClick = () => {
    dispatch(setOverviewTitle(postData));
    navigate("/posting-skills");
  };

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  return (
    <div style={styles.container}>
      {permission ? (
        <Container>
          <Card style={styles.outerCard}>
            <Card style={styles.innerCard}>
              <Card.Title style={styles.title}>
                <b style={styles.titleText}>Title</b>
              </Card.Title>
              <Form style={styles.form}>
                <Form.Control
                  placeholder='Enter a title that describes your post'
                  onChange={(e) => setPostData({ ...previousPostData, title: e.target.value })}
                />
              </Form>
              <Button onClick={handleNextClick} style={styles.nextButton}>Next</Button>
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
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCard: {
    position: 'relative',
    height: '500px',
    backgroundColor: 'black',
    color: 'blue',
    borderRadius: '40px',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
  },
  innerCard: {
    position: 'relative',
    borderRadius: '40px',
    backgroundColor: 'blue',
    padding: '20px',
    marginTop: '30px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  titleText: {
    color: 'black',
    fontSize: '30px',
  },
  form: {
    width: '100%',
    margin: '20px 0',
  },
  nextButton: {
    width: '100%',
    marginTop: '20px',
    backgroundColor: 'blue',
    color: 'black',
  },
  permissionContainer: {
    textAlign: 'center',
  },
  permissionCard: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '10px',
  },
};

export default Title;
