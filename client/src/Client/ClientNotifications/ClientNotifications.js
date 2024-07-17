import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProposalId } from '../../reducers/reducers';
import axios from 'axios';

function ClientNotifications() {
    const navigate = useNavigate();
    const [incomingProvidersData, setIncomingProvidersData] = useState([]);
    const dispatch = useDispatch();

    const handleButtonClick = (id) => {
        dispatch(setProposalId(id));
        console.log('click => ' + id);
        navigate('/proposal');
    };

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await fetch('https://sell-skill.com/api/endpoints/incomingProviderData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setIncomingProvidersData(result);
            } catch (error) {
                console.error('Failed to fetch proposals:', error);
            }
        };

        fetchProposals();
    }, []);

    const [permission, setPermission] = useState(false);
    let token;
    const tokenString = localStorage.getItem('clientToken');
    const tokenObject = JSON.parse(tokenString);
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
    }, []);

    useEffect(() => {
        const killProposalNewNotification = async () => {
            await axios.patch('https://sell-skill.com/api/endpoints/cancelClientNewProposals');
        };
        killProposalNewNotification();
    }, []);

    const navigateSignUpIn = () => {
        navigate('/auth');
    };

    return (
        <div style={{ backgroundColor: 'blue', minHeight: '100vh' }}>
            <Container className="py-4">
                {permission ? (
                    <Row className="justify-content-center">
                        {incomingProvidersData.length > 0 ? (
                            incomingProvidersData.map((proposal, index) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
                                    <Card className="text-center" style={{ backgroundColor: 'black', color: 'blue' }}>
                                        <Card.Body>
                                            <Card.Title style={{ color: 'black' }}>
                                                You got a proposal from
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>Name:</strong> {proposal.incomingProvider.providerName} <br />
                                                <strong>Email:</strong> {proposal.incomingProvider.providerEmail}
                                            </Card.Text>
                                            <Button onClick={() => handleButtonClick(proposal.incomingProvider._id)} variant="primary">
                                                View Proposal
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p className="text-center text-white">There aren't any proposals</p>
                            </Col>
                        )}
                    </Row>
                ) : (
                    <div className="text-center mt-5">
                        <Card className="mx-auto" style={{ width: '400px' }}>
                            <Card.Body>
                                <Button onClick={navigateSignUpIn}>Sign Up/In</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default ClientNotifications;
