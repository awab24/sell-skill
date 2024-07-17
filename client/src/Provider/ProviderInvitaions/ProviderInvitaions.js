import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setInvitationId } from '../../reducers/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProviderInvitations() {
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInvitations = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/getInvitations');
      setInvitations(response.data);
    };
    getInvitations();
  }, []);

  const goToChoosenInvitation = async (e) => {
    navigate('/choosen-invitation');
    await axios.post(`https://sell-skill.com/api/endpoints/sendChoosenId/${e}`);
  };

  useEffect(() => {
    const killInviteNotification = async () => {
      await axios.patch('https://sell-skill.com/api/endpoints/cancelProviderNewInvites');
    };
    killInviteNotification();
  }, []);

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        {invitations.length > 0 ? (
          invitations.map((invitation) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={invitation._id}>
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Text>
                    You have an invitation from{' '}
                    <strong>{invitation.invitaion.invitorClientName}</strong>
                  </Card.Text>
                  <Button variant="primary" onClick={() => goToChoosenInvitation(invitation._id)}>
                    View Invitation
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <div>No invitations</div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ProviderInvitations;
