import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Inviting() {
  const [permission, setPermission] = useState(false) 
  const [providerEmail, setProviderEmail] = useState('')
  const [invitationMessage, setInvitationMessage] = useState('')
let token; 
const tokenString = localStorage.getItem('clientToken') 
const tokenObject = JSON.parse(tokenString) 
token = tokenObject.token 
if(!token){ 
  token = tokenObject 
} 
console.log('token from mainHome => '+ token) 
const navigate = useNavigate() 
 
 
 
  useEffect(() => { 
    const fetchPermission = async() => { 
      const response = await axios.get('http://localhost:5000/api/endpoints/verifyClient',{headers: 
        { 
         Authorization:  
           `Bearer ${token}`
          
        } 
        } 
       
        ) 
      console.log(response.data.permission) 
      setPermission(response.data.permission) 
  
    } 
fetchPermission(); 
  }, []) 
 
 
const navigateSignUpIn = () => { 
  navigate('/auth') 
}

const handleInvite = async() => {
  navigate('/provider')
  await axios.post('http://localhost:5000/api/endpoints/sendInvite', {providerEmail: providerEmail, message: invitationMessage})

}
  return (
    <div>
      {
        permission ? (<div>
          <Form >
            <Form.Control placeHolder="enter the right provider email " onChange={(e) => setProviderEmail(e.target.value)} />
          </Form>
          <Form>
            <Form.Control placeholder='enter your invitation message' onChange={(e) => setInvitationMessage(e.target.value)}/>
          </Form>
          <Button onClick={handleInvite}>invite</Button>
        </div>)
        :
        (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  )
}

export default Inviting
