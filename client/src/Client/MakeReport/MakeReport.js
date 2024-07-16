import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MakeReport() {
    const [providerEmail, setProviderEmail] = useState('');
    const [report, setReport] = useState('');
    const navigate = useNavigate();

    const handleUploadReport = async () => {
        await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertReport', { providerEmail, report });
        navigate('/client');
    };

    return (
        <div style={styles.container}>
            <Container>
                <Card style={styles.card}>
                    <Card.Title style={styles.title}>
                        <b>Create a Report</b>
                    </Card.Title>
                    <Form style={styles.form}>
                        <Form.Control
                            placeholder='Enter the provider email'
                            onChange={(e) => setProviderEmail(e.target.value)}
                            style={styles.input}
                        />
                        <Form.Control
                            placeholder='Enter the report you want to make'
                            onChange={(e) => setReport(e.target.value)}
                            style={styles.input}
                        />
                        <Button onClick={handleUploadReport} style={styles.button}>
                            Upload
                        </Button>
                    </Form>
                </Card>
            </Container>
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
    },
    card: {
        backgroundColor: '#000',
        color: '#00f',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#00f',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        marginBottom: '15px',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: '#00f',
        color: '#fff',
        borderRadius: '30px',
        width: '100%',
        padding: '10px',
    },
};

export default MakeReport;
