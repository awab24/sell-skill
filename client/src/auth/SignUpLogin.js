import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeAuth, setProviderId, setProviderOrClientId } from '../reducers/reducers'


function SignUpLogin() {
  const dispatch = useDispatch();
  const [notAllowed, setNotAllowed] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  let responseProvider;
  let responseClient;
  let responseProviderId;
  let clientToken;
  let providerToken;
  const [clientResult, setClientResult] = useState(true)
 const [providerResult, setProviderResult]= useState(true)


  const googleSuccess = async(response) => {
    const {credential} = response;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    const {email} = payload;
    console.log('email => '+email)
  
    try {
      responseClient = await axios.post('http://localhost:5000/api/endpoints/clientSignIn', {email:email, password: ''});
      clientToken  = responseClient.data;
      localStorage.setItem('clientToken', JSON.stringify(clientToken));
        responseClient && navigate('/Client');

    } catch (error) {
      setClientResult(false)
      try {
        responseProvider = await axios.post('http://localhost:5000/api/endpoints/providerSignIn', {email:email, password: ''});
        providerToken  = responseProvider.data;
        localStorage.setItem('providerToken', JSON.stringify(providerToken));
          responseProvider && navigate('/provider');
    
      } catch (error) {
        setProviderResult(false)
      }
    }


  }

  const handleClick = async () => {
    try {


      try {
        responseClient = await axios.post('http://localhost:5000/api/endpoints/clientSignIn', signInData);
        clientToken  = responseClient.data;
        localStorage.setItem('clientToken', JSON.stringify(clientToken));

      } catch (error) {
        setClientResult(false)
        try {
          responseProvider = await axios.post('http://localhost:5000/api/endpoints/providerSignIn', signInData);
          providerToken  = responseProvider.data;
          localStorage.setItem('providerToken', JSON.stringify(providerToken));
    

        } catch (secondError) {
          setProviderResult(false)
          console.error('Both sign-in attempts failed:', secondError);
          return; // or handle the error appropriately
        }
      }
        

      // Store the token securely in localStorage

  

      localStorage.setItem('authenticated', 'true');
      dispatch(changeAuth(true));
      
      responseClient && navigate('/Client');
      responseProvider && navigate('/provider')
      if(responseClient || responseProvider){
        const responseProviderOrClientId = await axios.get('http://localhost:5000/api/endpoints/providerOrClientId')
        console.log(dispatch(setProviderOrClientId(responseProviderOrClientId.data)))
      }

    } catch (error) {
      console.error('Sign-in failed:', error);
      setNotAllowed(true);
      localStorage.setItem('authenticated', 'false');
      dispatch(changeAuth(false));
    }
  };


 
  


  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '100px', 'height': '500px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '330px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '270px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Login
        </b>

         </Card.Title>
         <Form style={{'position': 'relative', 'top': '130px','left':'30px', 'borderRadius': '90px', 'width':'500px'}} >
             <Form.Control placeholder='email or username' onChange={(e)=> setSignInData({...signInData, email: e.target.value})}/>
        </Form>
        <Form style={{'position': 'relative', 'top': '160px', 'left':'30px', 'width':'500px'}} >
          <Form.Control placeholder='password' onChange={(e)=> setSignInData({...signInData, password: e.target.value})}/>
        </Form>

        <Button onClick={handleClick} style={{'position': 'relative', 'top': '190px' }}><b style={{'color': 'black', 'fontSize': '16px'}}>Log in</b></Button>

        <a href="/sign-up-client-provider " style={{'backgroundColor': 'black', 'position': 'relative', 'top':'230px', 'left': '160px'}}>
        don't have an account?!  let's sign up
      </a>
      <div style={{'position': 'relative', 'top':'250px', 'left': '170px'}}>
      <GoogleLogin onSuccess={googleSuccess}/>
      </div>
     

     {
      notAllowed && <div style={{'backgroundColor': 'blue', 'position': 'relative', }}><b>not allowed please make sure you have an account</b></div>
     }
      </Card>
    
    

    {
      !clientResult && !providerResult && <div>email or password might be incorrect</div>
    }

    
    </Card>
    </Container>
    
    </div>

  )
}

export default SignUpLogin
