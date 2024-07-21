import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProposalId, setProviderId } from '../../reducers/reducers';

function InvitationAcceptance() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [invitationAcceptances, setInvitationAcceptances] = useState([])

    useEffect(() => {
      const killNewInvitationAcceptanceNotification = async() => {
        await axios.patch('https://sell-skill.com/api/endpoints/killNewInvitationAcceptanceNotification')
      }
      killNewInvitationAcceptanceNotification();
    }, [])
    useEffect(() => {
        const fetchInvitationsAcceptances = async() => {
            const result = await axios.get('https://sell-skill.com/api/endpoints/getInvitationAcceptance')
            setInvitationAcceptances(result.data)
            console.log('result data ====================================================> ', result.data, '  <===================================================================result data')
          invitationAcceptances.map((InvitationAcceptance) => 
          console.log('invitationAcceptance.invitationAcceptance  ==============================================================>  ',InvitationAcceptance.InvitationAcceptance,'  <<====================================================invitationAccepatance.invitationAcceptance'))
        };
        fetchInvitationsAcceptances()
    }, [])

    const handleGoToPayment = async(providerId) => {

        dispatch(setProposalId(providerId))
        navigate('/paypal')
    }
    const handleGoToMessage2 = async(providerId) => {
        dispatch(setProviderId(providerId))
        navigate('/client-access-messages')
    }
  return (
    <div>
        {
            invitationAcceptances.length > 0 ?
            invitationAcceptances.map((InvitationAcceptance) => 
            (
            <>
            <Card>{InvitationAcceptance.providerName+' '}has accepted your inivtation</Card>
            <Button onClick={() => handleGoToPayment(InvitationAcceptance.providerId)}>
        go to payment
      </Button>
      <Button onClick={() => handleGoToMessage2(InvitationAcceptance.providerId)}>
        Message
      </Button>
            </>)

            ): (<div>No invitation Acceptance</div>)
        }
      invitation acceptance

    </div>
  )
}

export default InvitationAcceptance
