import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';

function RelatedTeachers() {
    const [relatedProviders, setRelatedProviders] = useState([]);

    useEffect(() => {
        const fetchRelatedProviders = async () => {
            const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endPoints/getRelatedProviders');
            setRelatedProviders(response.data);
        };
        fetchRelatedProviders();
    }, []);

    return (
        <RelatedContainer>
            <h3 style={{ color: 'white' }}>Related Providers in Your Field</h3>
            {relatedProviders.length > 0 ? (
                relatedProviders.map((relatedProvider, index) => (
                    <ProviderCard key={index}>
                        <Card.Body>
                            <ProfileImage src={
                                relatedProvider.picture && relatedProvider.picture.picture && relatedProvider.picture.picture.data
                                    ? 'data:image/jpg;base64,' + Buffer.from(relatedProvider.picture.picture.data, 'binary').toString('base64')
                                    : "/images/NormalProfile.jpg"
                            } />
                            <Card.Title style={{ color: 'white' }}>{relatedProvider.name}</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{relatedProvider.email}</Card.Text>
                            <Card.Text style={{ color: 'white' }}>{relatedProvider.ratePerHour}</Card.Text>
                            <Card.Text style={{ color: 'white' }}>
                                {relatedProvider.categories.join(', ')}
                            </Card.Text>
                            <InviteButton>
                                <b>Invite</b>
                            </InviteButton>
                        </Card.Body>
                    </ProviderCard>
                ))
            ) : (
                <LoadingMessage>Loading...</LoadingMessage>
            )}
        </RelatedContainer>
    );
}

export default RelatedTeachers;

// Styled Components
const RelatedContainer = styled.div`
    background-color: blue;
    padding: 20px;
    min-height: 100vh;
`;

const ProviderCard = styled(Card)`
    background-color: black;
    margin-bottom: 40px;
    position: relative;
    color: white;
    padding: 20px;
    border-radius: 15px;

    @media (max-width: 768px) {
        margin: 20px;
    }
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
`;

const InviteButton = styled.div`
    background-color: green;
    height: 40px;
    width: 120px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 20px;
`;

const LoadingMessage = styled.div`
    color: white;
    text-align: center;
    font-size: 18px;
`;
