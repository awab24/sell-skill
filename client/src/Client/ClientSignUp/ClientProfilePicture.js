import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ClientProfilePicture() {
    const [picture, setPicture] = useState('');
    const navigate = useNavigate();

    const handleNextClick = () => {
        navigate("/client-category");
    };

    const handleUpload = async (e) => {

        const formData = new FormData();
        formData.append('picture', e);
        await axios.post('https://sell-skill.com/api/endpoints/insertClientPicture', formData);
    };

    return (
        <div style={styles.container}>
            <Container>
                <Card style={styles.outerCard}>
                    <Card style={styles.innerCard}>
                        <Card.Title style={styles.title}>
                            <b>A nice profile picture</b>
                        </Card.Title>
                        <div style={styles.uploadContainer}>
                            <input
                                type="file"
                                name="picture"
                                onChange={(e) => handleUpload(e.target.files[0])}
                                style={styles.fileInput}
                            />
                        </div>
                        {picture && (
                            <img
                                src={URL.createObjectURL(picture)}
                                style={styles.previewImage}
                                alt="Profile Preview"
                            />
                        )}
                        <div style={styles.buttonContainer}>

                            <Button onClick={handleNextClick} style={styles.button}>
                                Next
                            </Button>
                        </div>
                    </Card>
                </Card>
            </Container>
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
        height: '530px',
        backgroundColor: 'black',
        color: 'blue',
        borderRadius: '40px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '90%',
        maxWidth: '600px',
    },
    innerCard: {
        backgroundColor: 'blue',
        borderRadius: '40px',
        padding: '20px',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        fontSize: '30px',
        marginBottom: '20px',
        color: 'black',
    },
    uploadContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    fileInput: {
        color: 'black',
        width: '350px',
        margin: 'auto',
    },
    previewImage: {
        width: '140px',
        height: '140px',
        borderRadius: '40px',
        display: 'block',
        margin: '0 auto',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        width: '140px',
        margin: '0 5px',
    },
};

export default ClientProfilePicture;

