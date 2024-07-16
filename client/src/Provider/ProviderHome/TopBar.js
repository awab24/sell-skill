import React, { useEffect, useState } from 'react';
import { Button, Alert, Breadcrumb, Card, Form, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Buffer } from 'buffer';

function TopBar() {
  const [imageSrc, setImageSrc] = useState('');
  const [name, setName] = useState(null);
  const [newMessages, setNewMessages] = useState(false);
  const [newInvites, setNewInvites] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCheckProviderNewMessages = async () => {
      const providerNewMessagesResult = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/checkProviderNewMessages');
      setNewMessages(providerNewMessagesResult.data);
    };
    fetchCheckProviderNewMessages();
  }, []);

  useEffect(() => {
    const fetchCheckProviderNewInvites = async () => {
      const providerNewInvitesResult = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/checkProviderNewInvites');
      setNewInvites(providerNewInvitesResult.data);
    };
    fetchCheckProviderNewInvites();
  }, []);

  useEffect(() => {
    fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfileData')
      .then((response) => response.json())
      .then((result) => setName(JSON.stringify(result.name).replace(/"/g, '')));
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProfilePicture', {
          responseType: 'arraybuffer',
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        const mimeType = response.headers['content-type'];
        setImageSrc(`data:${mimeType};base64,${base64}`);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchImage();
  }, [name]);

  return (
    <Container fluid className="p-3">
      {newMessages && <Alert variant="danger">You have new messages!</Alert>}
      {newInvites && <Alert variant="danger">You have new invites!</Alert>}

      <Row className="align-items-center mb-3">
        <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
          <Breadcrumb>
            <Breadcrumb.Item href="/my-reports">Show Reports</Breadcrumb.Item>
            <Breadcrumb.Item href="/provider-messages">Messages</Breadcrumb.Item>
            <Breadcrumb.Item href="/provider-invitaions">My Invitations</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={12} md={4} className="text-center">
          <h1 className="text-white">Welcome {name}</h1>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end">
          <a href="/provider-profile-4provider" style={{ textDecoration: 'none' }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="mb-3">{name}</Card.Title>
                <img
                  src={imageSrc}
                  alt="Profile"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default TopBar;
