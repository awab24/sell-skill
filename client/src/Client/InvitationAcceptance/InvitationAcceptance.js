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
            result.data.map((invitationAcceptance) => 
                console.log('invitationAcceptance.invitationAcceptance  ==============================================================>  ', invitationAcceptance.invitationAcceptance, '  <<====================================================invitationAcceptance.invitationAcceptance'))
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
                invitationAcceptances.map(({ invitationAcceptance }) => (
                    <div key={invitationAcceptance.providerId}>
                        <Card>{invitationAcceptance.providerName + ' '} has accepted your invitation</Card>
                        <Button onClick={() => handleGoToPayment(invitationAcceptance.providerId)}>
                            Go to payment
                        </Button>
                        <Button onClick={() => handleGoToMessage2(invitationAcceptance.providerId)}>
                            Message
                        </Button>
                    </div>
                )) : (
                    <div>No invitation acceptance</div>
                )
            }
        </div>
    )
}

export default InvitationAcceptance
