import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setProposalId, setProviderId } from '../../reducers/reducers';

function InvitationAcceptance() {
    const dispatch = useDispatch()
    const [invitationAcceptances, setInvitationAcceptances] = useState([])

    useEffect(() => {
        const fetchInvitationsAcceptances = async() => {
            const result = await axios.get('https://sell-skill.com/api/endpoints/getInvitationAcceptance')
            setInvitationAcceptances(result.data)

        };
        fetchInvitationsAcceptances()
    }, [])

    const handleGoToPayment = async(providerId) => {
        dispatch(setProposalId(providerId))
    }
    const handleGoToMessage2 = async(providerId) => {
        dispatch(setProviderId(providerId))
    }
  return (
    <div>
        {
            invitationAcceptances.length > 0 ?
            invitationAcceptances.map((InvitationAcceptance) => 
            (<div>{InvitationAcceptance.name+' '}has accepted your inivtation</div>)

            ): (<div>No invitation Acceptance</div>)
        }
      invitation acceptance
      <Button onClick={() => handleGoToPayment(InvitationAcceptance.InvitationAcceptance.providerId)}>
        go to payment
      </Button>
      <Button onClick={() => handleGoToMessage2(InvitationAcceptance.InvitationAcceptance.providerId)}>
        Message
      </Button>
    </div>
  )
}

export default InvitationAcceptance
