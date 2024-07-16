import React, { useState } from 'react'
import SignUp from '../../auth/SignUp'
import { Container, Card, Form,Button } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ClientSignUp() {
  let clientToken;
  let responseClient;

  const navigate = useNavigate()
  let findUser;
  const [clientSignUpData, setClientSignUpData] = useState({_id: uuidv4(),name: '', surname:'', email: '', password: '', confirmPassword: ''})
  const [alreadyClientExist, setAlreadyClientExist] = useState(false)
  const handleClientSignUp = async() => {
    responseClient = await  axios.post('http://localhost:5000/api/endpoints/clientSignUp',clientSignUpData)
    clientToken  = responseClient.data;
    if(!clientToken){
      setAlreadyClientExist(true)
    }
    console.log(JSON.stringify(clientToken))
    localStorage.setItem('clientToken', JSON.stringify(clientToken));
    clientToken &&
    navigate("/client-profile-picture")
  }

  const googleSuccess = async(response) => {
    const {credential} = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const {email, name, lastName} = payload;


    responseClient = await  axios.post('http://localhost:5000/api/endpoints/clientSignUp', {_id: uuidv4(), name: name,surname: lastName, email: email, password: '',confirmPassword: '' })
    clientToken  = responseClient.data;
    if(!clientToken){
      setAlreadyClientExist(true)
    }
    console.log(JSON.stringify(clientToken))
    localStorage.setItem('clientToken', JSON.stringify(clientToken));
    clientToken && 
    navigate("/client-profile-picture")

  }

  return (
    <div  style={{'backgroundColor': 'blue','height': '633px'}}>
    <Container >
      <Card style={{'position':'relative', 'top': '30px', 'height':'550px', 'borderRadius':'30px', 'backgroundColor':'black'}}>
      <Card style={{'position':'relative', 'top': '30px', 'borderRadius':'30px', 'backgroundColor':'black', 'width': '700px',}}>
          <Card.Title style={{'position':'relative', 'top':'40px', 'left': '460px', 'color': 'blue', 'fontSize': '20px  '}}>
            Sign up as a client
          </Card.Title>
            <Form style={{'position': 'relative', 'top': '80px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='name' onChange={(e) => setClientSignUpData({...clientSignUpData, name: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '90px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='surname' onChange={(e) => setClientSignUpData({...clientSignUpData, surname: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '100px','left':'230px',  'width': '630px'}} >
              <Form.Control placeholder='email' onChange={(e) => setClientSignUpData({...clientSignUpData, email: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '110px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='password' onChange={(e) => setClientSignUpData({...clientSignUpData, password: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '120px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='confrim password' onChange={(e) => setClientSignUpData({...clientSignUpData, confirmPassword: e.target.value})}/>
            </Form>
            
            <Button style={{'position':'relative', 'top': '150px' ,'left':'150px',  'width': '800px', 'height': '45px', 'borderRadius': '30px'}} onClick={handleClientSignUp}>
              Sign up
            </Button>
            <a href="/auth" style={{'position':'relative', 'top': '170px', 'left': '400px'}}>
              already have an account?! let's sign in
            </a>
  <div style={{'position': 'relative', 'top': '180px', 'left': '420px'}}>
  <GoogleLogin onSuccess={googleSuccess}/>
  </div>
  {
    alreadyClientExist && <div>email already exist</div>
  }
        </Card>   
      </Card>
      
      </Container>
      </div>
  )
}

export default ClientSignUp
