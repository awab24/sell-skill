import React, { useEffect, useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';

function TopBar() {
  const [checkNewMessages, setCheckNewMessages] = useState(false);
  const [checkNewInvitationAcceptance, setCheckNewInvitationAcceptance] = useState(false)
  const [newProposals, setNewProposals] = useState(false);
  const [profilePictureSrc, setProfilePictureSrc] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchCheckClientNewMessage = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/checkClientNewMessage');
      setCheckNewMessages(response.data);
    };
    fetchCheckClientNewMessage();
  }, []);


  useEffect(() => {
    const fetchCheckNewInvitationAcceptance = async() => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/getNewInvitationAcceptanceState')
      setCheckNewInvitationAcceptance(response.data)
    };
    fetchCheckNewInvitationAcceptance();
  }, [])
  useEffect(() => {
    const checkNewProposal = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/checkClientNewProposals');
      setNewProposals(response.data);
    };
    checkNewProposal();
  }, []);
  
  useEffect(() => {
    fetch('https://sell-skill.com/api/endpoints/getClientProfileData')
      .then(response => response.json())
      .then(result => setName(result.name));
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://sell-skill.com/api/endpoints/getClientProfilePicture', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setProfilePictureSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImage();
  }, [name]);

  return (
    <TopBarContainer>
      {checkNewMessages && <Alert variant="danger">You have new messages!</Alert>}
      {newProposals && <Alert variant="danger">You have got proposal!</Alert>}
    {checkNewInvitationAcceptance && <Alert variant="danger">your invitation was accepted!</Alert>}
      <NavLinks>
        <NavLink href="/report" style={{'color':'black', 'position':'relative', 'padding-right':'20px'}}>Make Report</NavLink>
        <NavLink href="/notifications" style={{'color':'black', 'position':'relative', 'padding-right':'20px'}}>Notifications & Providers</NavLink>
        <NavLink href="/client-received-messages" style={{'color':'black', 'position':'relative', 'padding-right':'20px'}}>Messages</NavLink>
        <NavLink href="/client-posts" style={{'color':'black', 'position':'relative', 'padding-right':'20px'}}>My Posts</NavLink>
        <NavLink href="/invitation-acceptance" style={{'color':'black', 'position':'relative', 'padding-right':'20px'}}>Invitation acceptance</NavLink>
      </NavLinks>

      <ProfileCard style={{'position':'relative', 'right':'300px'}}>
        <Card.Title>{name}</Card.Title>
        {
          profilePictureSrc && 
          <ProfileImage src={profilePictureSrc || "/images/NormalProfile.jpg"} />
        }

      </ProfileCard>
    </TopBarContainer>
  );
}

export default TopBar;

// Styled Components
const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
  padding: 20px;
  color: white;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
