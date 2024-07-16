import React, { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Accept.css';
import axios from 'axios';

function Accept() {
  const navigate = useNavigate();
  const [permission, setPermission] = useState(false) 
  let token; 
  const tokenString = localStorage.getItem('clientToken') 
  const tokenObject = JSON.parse(tokenString) 
  token = tokenObject.token 
  if(!token){ 
    token = tokenObject 
  } 
  console.log('token from mainHome => '+ token) 

   
   
   
    useEffect(() => { 
      const fetchPermission = async() => { 
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient',{headers: 
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
  return (
    <div className="accept-container">
      {
        permission ? (      <Container>
          <Card className="accept-card">
            <Card.Body>
              You have accepted the proposal.
            </Card.Body>
            <Button className="accept-button" onClick={() => navigate("/choose-method")}>
              Go to Payment $
            </Button>
          </Card>
        </Container>): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  );
}

export default Accept;
