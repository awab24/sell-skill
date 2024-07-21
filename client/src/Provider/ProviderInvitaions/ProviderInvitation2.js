import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProviderInvitation2() {
  const [choosenInvitation, setChoosenInvitation] = useState([]);
  const navigate = useNavigate()
  const clientId = useSelector((state) => state.allow.clientId)

  useEffect(() => { 
    const getChoosenInvitation = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/getInvitationContent');
      setChoosenInvitation(response.data);
    };
    getChoosenInvitation();
  }, []);


  const handleInviteAccept = async(clientID) => {
 try {
  console.log('clientId ======================================>     > > > '+clientID)
  await axios.post(`https://sell-skill.com/api/endpoints/insertInviteAcceptance/${clientID}`)
 } catch (error) {
  
 }

    navigate('/provider')
  }

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        {choosenInvitation.length > 0 ? (
          choosenInvitation.map((invitation, index) => (
            <Col xs={12} md={8} lg={6} className="mb-4" key={index}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Text>
                    {invitation?.invitaion?.invitaionContent}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Button onClick={() => handleInviteAccept(invitation.invitaion.clientId)}>
                Accept
              </Button>

            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <div>No invitations available.</div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ProviderInvitation2;
