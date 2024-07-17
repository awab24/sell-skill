import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewExperience } from '../../reducers/reducers';
import axios from 'axios';

function Experience() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const previousPostData = useSelector((state) => state.allow.overview);
    const [postData, setPostData] = useState(previousPostData);
    const [permission, setPermission] = useState(false);

    const tokenString = localStorage.getItem('clientToken');
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token || tokenObject;

    useEffect(() => {
        const fetchPermission = async () => {
            const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPermission(response.data.permission);
        };
        fetchPermission();
    }, [token]);

    const handleNextClick = () => {
        dispatch(setOverviewExperience(postData));
        navigate('/posting-pudget');
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
                                <b>Your request needs a</b>
                            </Card.Title>
                            <div style={styles.buttonContainer}>
                                <Button
                                    style={styles.experienceButton}
                                    onClick={() => setPostData({ ...postData, experience: 'Senior' })}
                                >
                                    <b>Senior</b>
                                </Button>
                                <Button
                                    style={styles.experienceButton}
                                    onClick={() => setPostData({ ...postData, experience: 'Medium' })}
                                >
                                    <b>Medium</b>
                                </Button>
                                <Button
                                    style={styles.experienceButton}
                                    onClick={() => setPostData({ ...postData, experience: 'Junior' })}
                                >
                                    <b>Junior</b>
                                </Button>
                            </div>
                            <Button style={styles.nextButton} onClick={handleNextClick}>
                                Next
                            </Button>
                        </Card>
                    </Card>
                </Container>
            ) : (
                <div style={styles.signupPrompt}>
                    <Card style={styles.promptCard}>
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
        backgroundColor: 'black',
        color: 'blue',
        borderRadius: '40px',
        padding: '20px',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    innerCard: {
        backgroundColor: 'blue',
        borderRadius: '30px',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '25px',
        color: 'black',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    experienceButton: {
        width: '200px',
        height: '100px',
        color: 'black',
        fontSize: '18px',
        borderRadius: '10px',
        margin: '0 5px',
    },
    nextButton: {
        width: '200px',
        height: '50px',
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: '10px',
        marginTop: '20px',
    },
    signupPrompt: {
        textAlign: 'center',
        marginTop: '170px',
    },
    promptCard: {
        width: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'black',
        color: 'blue',
    },
};

export default Experience;
