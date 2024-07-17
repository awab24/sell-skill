import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewDescription } from '../../reducers/reducers';
import axios from 'axios';

function Description() {
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
        dispatch(setOverviewDescription(postData));
        navigate('/posting-overview');
        console.log(postData);
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
                                <b>Description</b>
                            </Card.Title>
                            <Form style={styles.form}>
                                <Form.Control
                                    placeholder='Enter a detailed description for your call'
                                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                                    style={styles.input}
                                />
                                <Button onClick={handleNextClick} style={styles.button}>
                                    Next
                                </Button>
                            </Form>
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
    },
    title: {
        textAlign: 'center',
        fontSize: '30px',
        color: 'black',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
    },
    input: {
        marginBottom: '20px',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '30px',
        width: '100%',
        padding: '10px',
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

export default Description;
