import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ProviderInvitation2() {
    const [choosenInvitation, setChoosenInvitation] = useState([])
    useEffect(() => {
        const getChoosenInvitation = async() => {
            const response = await axios.get('http://localhost:5000/api/endpoints/getInvitationContent')
            setChoosenInvitation(response.data)
        }
        getChoosenInvitation()
    },[])
  return (
    <div>
      {
        choosenInvitation.length > 0 ? choosenInvitation.map((choosenInvitation) => 
            <div>
                {
                    choosenInvitation?.invitaion?.invitaionContent
                    
                }
            </div>): null
      }
    </div>
  )
}

export default ProviderInvitation2
