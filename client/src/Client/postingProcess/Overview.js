import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Overview() {
    const postData = useSelector((state) => state.allow.overview);
    const [permission, setPermission] = useState(false);
    const tokenString = localStorage.getItem('clientToken');
    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token || tokenObject;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPermission = async () => {
            const response = await axios.get('https://sell-skill.com/api/endpoints/verifyClient', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPermission(response.data.permission);
        };
        fetchPermission();
    }, [token]);

    const handlePost = async () => {
        navigate('/client')
        await axios.post('https://sell-skill.com/api/endpoints/insertPost', postData);
    };

    const navigateSignUpIn = () => {
        navigate('/auth');
    };

    return (
        <div style={styles.container}>
            {permission ? (
                <Container>
                    <Card style={styles.card}>
                        <Card.Title style={styles.title}>Overview</Card.Title>

                        <div style={styles.grid}>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Term</Card.Title>
                                <div style={styles.infoText}>{postData.term}</div>
                            </Card>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Title</Card.Title>
                                <div style={styles.infoText}>{postData.title}</div>
                            </Card>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Skills</Card.Title>
                                <div style={styles.infoText}>{postData.skills}</div>
                            </Card>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Estimate Scope</Card.Title>
                                <div style={styles.infoText}>{postData.scope}</div>
                            </Card>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Experience Level</Card.Title>
                                <div style={styles.infoText}>{postData.experience}</div>
                            </Card>
                            <Card style={styles.infoCard}>
                                <Card.Title style={styles.infoTitle}>Budget</Card.Title>
                                <div style={styles.infoText}>{postData.pudget}</div>
                            </Card>
                        </div>

                        <Card style={{ ...styles.infoCard, width: '100%', marginTop: '20px' }}>
                            <Card.Title style={styles.infoTitle}>Description</Card.Title>
                            <div style={styles.infoText}>{postData.description}</div>
                        </Card>

                        <Button style={styles.postButton} onClick={handlePost}>Post</Button>
                    </Card>
                </Container>
            ) : (
                <div style={styles.signInPrompt}>
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
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: '30px',
        backgroundColor: 'black',
        color: 'blue',
        width: '90%',
        maxWidth: '700px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    title: {
        color: 'blue',
        fontSize: '24px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '10px',
        marginBottom: '20px',
    },
    infoCard: {
        borderRadius: '20px',
        backgroundColor: 'blue',
        color: 'blue',
        padding: '15px',
    },
    infoTitle: {
        color: 'blue',
        fontSize: '18px',
        marginBottom: '10px',
    },
    infoText: {
        color: 'black',
        fontSize: '16px',
    },
    postButton: {
        width: '100%',
        height: '50px',
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '10px',
        marginTop: '20px',
    },
    signInPrompt: {
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

export default Overview;
