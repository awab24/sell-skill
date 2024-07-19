
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProviderId } from '../../reducers/reducers';

function RelatedTeachers() {
    const [relatedProviders, setRelatedProviders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRelatedProviders = async (retryCount = 0) => {
            try {
                const response = await axios.get('https://sell-skill.com/api/endPoints/getRelatedProviders');
                setRelatedProviders(response.data);
            } catch (error) {
                if (retryCount < 3) {
                    setTimeout(() => fetchRelatedProviders(retryCount + 1), 3000); // Retry after 3 seconds
                } else {
                    console.error('Error fetching related providers:', error);
                }
            }
        };
        fetchRelatedProviders();
    }, []);

    const goToCertainProvider = (id) => {
        dispatch(setProviderId(id));
        navigate('/certain-provider');
    }

    return (
        <RelatedContainer>
            <Header>Related Providers in Your Field</Header>
            {relatedProviders.length > 0 ? (
                relatedProviders.map((relatedProvider) => (

                                                <>
                                                
                                                <StyledButton key={relatedProvider._id} onClick={() => goToCertainProvider(relatedProvider._id)}>
                        <ProviderCard>
                            <Card.Body>
                                <ProfileImage src={
                                    relatedProvider.picture && relatedProvider.picture.picture && relatedProvider.picture.picture.data
                                        ? 'data:image/jpg;base64,' + Buffer.from(relatedProvider.picture.picture.data, 'binary').toString('base64')
                                        : "/images/NormalProfile.jpg"
                                } />
                                <CardTitle>{relatedProvider.name}</CardTitle>
                                <CardText>{relatedProvider.email}</CardText>
                                <CardText>{relatedProvider.ratePerHour}</CardText>
                                <CardText>{relatedProvider.categories.join(', ')}</CardText>

                            </Card.Body>
                        </ProviderCard>
                    </StyledButton>
                                                    <InviteButton style={{'position':'relative', 'zIndex':'10'}} onClick={() => navigate('/inviting')}>
                                                    <b>Invite</b>
                                                </InviteButton></>
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
    background-color: #004e92;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.h3`
    color: white;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 20px;
    padding: 0;
    background-color: transparent;
    border: none;
`;

const ProviderCard = styled(Card)`
    background-color: #1e1e1e;
    color: white;
    padding: 20px;
    border-radius: 15px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    object-fit: cover;
`;

const CardTitle = styled(Card.Title)`
    color: white;
    font-size: 1.25rem;
`;

const CardText = styled(Card.Text)`
    color: white;
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
    color: white;
`;

const LoadingMessage = styled.div`
    color: white;
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
`;
