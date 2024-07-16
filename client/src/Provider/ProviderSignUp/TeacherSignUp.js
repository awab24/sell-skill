import React, { useEffect, useState } from 'react'
import { Container, Card, Form,Button } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



function TeacherAuth() {
  const [providerSignUpData, setProviderSignUpData] = useState({_id:uuidv4(), name: '', surname:'', email: '', password: '', confirmPassword: ''})
  const [alreadyProviderExist, setAlreadyProviderExist] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let responseProvider;
  let providerToken;


  const googleSuccess = async(response) => {
    const {credential} = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const {email, name, family_name} = payload;
    console.log('name => '+name)
    console.log('email => '+email)
    console.log('last name => ' + family_name)
    try {
      responseProvider = await  axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/providerSignUpData', {_id: uuidv4(), name: name,surname: family_name, email: email, password: '',confirmPassword: '' })
      providerToken  = responseProvider.data;
      console.log(JSON.stringify(providerToken))
      localStorage.setItem('providerToken', JSON.stringify(providerToken));
      if(!providerToken){
        setAlreadyProviderExist(true)
      }
      providerToken &&
      navigate("/profile-picture")
    } catch (error) {
      setAlreadyProviderExist(true)
    }

  
  }
  const handleProviderSignUp = async() => {
    
    try {
      responseProvider = await  axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/providerSignUpData',providerSignUpData)
      providerToken  = responseProvider.data;
      if(!providerToken){
        setAlreadyProviderExist(true)
      }
      console.log(JSON.stringify(providerToken))
      localStorage.setItem('providerToken', JSON.stringify(providerToken));
      providerToken &&
      navigate("/profile-picture")

    } catch (error) {

    }

}


  return (
    <div  style={{'backgroundColor': 'blue','height': '633px'}}>

    <Container >
      <Card style={{'position':'relative', 'top': '30px', 'height':'550px', 'borderRadius':'30px', 'backgroundColor':'black'}}>
      <Card style={{'position':'relative', 'top': '30px', 'borderRadius':'30px', 'backgroundColor':'black', 'width': '700px',}}>
          <Card.Title style={{'position':'relative', 'top':'40px', 'left': '450px', 'color': 'blue', 'fontSize': '20px  '}}>
            Sign up as a provider
          </Card.Title>
            <Form style={{'position': 'relative', 'top': '80px','left':'230px',  'width': '630px'}} >
              <Form.Control placeholder='name' onChange={(e) => setProviderSignUpData({...providerSignUpData, name: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '90px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='surname' onChange={(e) => setProviderSignUpData({...providerSignUpData, surname: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '100px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='email'  onChange={(e) => setProviderSignUpData({...providerSignUpData, email: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '110px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='password'  onChange={(e) => setProviderSignUpData({...providerSignUpData, password: e.target.value})}/>
            </Form>
            <Form style={{'position': 'relative', 'top': '120px','left':'230px',  'width': '630px'}}>
              <Form.Control placeholder='confrim password'  onChange={(e) => setProviderSignUpData({...providerSignUpData, confirmPassword: e.target.value})}/>
            </Form>
            
            <Button style={{'position':'relative', 'top': '150px' ,'left':'790px',  'width': '300px', 'height': '45px',}} onClick={handleProviderSignUp}>
              Next
            </Button>
            <a href="/auth" style={{'position':'relative', 'top': '170px', 'left': '400px'}}>
              already have an account?! let's sign in
            </a>
  <div style={{'position': 'relative', 'top': '180px', 'left': '420px'}}>
  <GoogleLogin 
  onSuccess={googleSuccess}
  />
  </div>
  {
    alreadyProviderExist && <div>email is already exist</div>
  }
        </Card>   
      </Card>
      
      </Container>
      </div>
  )
}

export default TeacherAuth
