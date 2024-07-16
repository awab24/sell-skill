import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { setInvitationId } from '../../reducers/reducers'

function ProviderInvitaions() {
  const [invitations, setInvitations] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getInvitations = async() => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getInvitations')
      setInvitations(response.data)


    }
    getInvitations();
  }, [])


  const goToChoosenInvitation = async(e) => {

    navigate('/choosen-invitation')
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendChoosenId/'+e)
  }
  useEffect(() => {
    const killInviteNotification = async() => {
      await axios.patch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/cancelProviderNewInvites')
    }
    killInviteNotification();
    }, [])
  return (
    <div>
        {
          invitations.length > 0 ? 
          invitations.map((invitation) => <Card>
            <Button onClick={() => goToChoosenInvitation(invitation._id)}>
           you got an invitation from  {
            invitation.invitaion.invitorClientName           
}</Button></Card>): (<div>No invitations</div>)
        }
    </div>
  )
}

export default ProviderInvitaions
