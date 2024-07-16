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
      const response = await axios.get('http://localhost:5000/api/endpoints/getInvitations')
      setInvitations(response.data)


    }
    getInvitations();
  }, [])


  const goToChoosenInvitation = async(e) => {

    navigate('/choosen-invitation')
    await axios.post('http://localhost:5000/api/endpoints/sendChoosenId/'+e)
  }
  useEffect(() => {
    const killInviteNotification = async() => {
      await axios.patch('http://localhost:5000/api/endpoints/cancelProviderNewInvites')
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
