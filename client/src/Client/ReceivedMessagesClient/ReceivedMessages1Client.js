import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProviderId } from '../../reducers/reducers';

function ReceivedMessages1Client() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [receivedMessages, setReceivedMessages] = useState('')
    const handleNameClick = async(id) => {
        navigate("/client-access-messages")
        dispatch(setProviderId(id))
        
    }

    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/endpoints/getProviderToClientMessagesInClient');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setReceivedMessages(result);  // Assuming result is an array or object directly
            await axios.patch('http://localhost:5000/api/endpoints/cancelClientNewMessages')
          } catch (error) {
            console.error('Failed to fetch posts:', error);
          }
        };
      
        fetchPosts();
      }, []);
      
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

  return (
    <div>
      {
        permission ? (    <div>
          {
              receivedMessages.length > 0 ?
              (
                  receivedMessages.map ((receivedMessage) => 
                      <Card>{
                        receivedMessage.message.name ?
                        
                        
                   <Button onClick={() => handleNameClick(receivedMessage.message.providerId)}>
                      {
                       receivedMessage.message.name 
                      }
                  </Button>: null}
                      </Card>
            
                  )
              ):(<></>)
          }
  
      </div>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  )
}

export default ReceivedMessages1Client
