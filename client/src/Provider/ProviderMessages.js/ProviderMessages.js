import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClientId, setClientName, setOldMessagesLength } from '../../reducers/reducers';
import axios from 'axios';

function ProviderMessages() {
let responseProviderId;
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [providerId, setProviderId] = useState('')
    const handleClickOnMessage = (id) => {
      navigate('/provider-client-messaging')
      dispatch(setClientId(id))
    

    }
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/endpoints/getMessagesFromClientIntoProvider');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setMessages(result);  // Assuming result is an array or object directly


          } catch (error) {
            console.error('Failed to fetch posts:', error);
          }
          try{
            responseProviderId =  await axios.post('http://localhost:5000/api/endpoints/sendProviderIdToFront')
            responseProviderId = await responseProviderId.data;
            setProviderId(responseProviderId)
          }catch(error){
            
          }
        };
    
        fetchPosts();
      }, []);
    
      useEffect(() => {
      const fetchProviderId = async () => {

        try{
          responseProviderId =  await axios.post('http://localhost:5000/api/endpoints/sendProviderIdToFront')
          responseProviderId = await responseProviderId.data;
          console.log('responseProviderId => => => => '+responseProviderId)
        }catch(error){
          
        }
      };
  
      fetchProviderId();
    }, []);
      console.log(messages)


      const [permission, setPermission] = useState(false)  
let token;  
const tokenString = localStorage.getItem('providerToken')  
const tokenObject = JSON.parse(tokenString)  
token = tokenObject.token  
if(!token){  
  token = tokenObject  
}  
console.log('token from mainHome => '+ token)  

  
  
  
  useEffect(() => {  
    const fetchPermission = async() => {  
      const response = await axios.get('http://localhost:5000/api/endpoints/verifyProvider',{headers:  
        {  
         Authorization:   
           `Bearer ${token}`
           
        }  
        }  
        
        )  
      console.log(response.data.permission)  
      setPermission(response.data.permission)  
      await axios.patch('http://localhost:5000/api/endpoints/cancelProviderNewMessages')
    }  
fetchPermission();  
  }, [])  
  
  
const navigateSignUpIn = () => {  
  navigate('/auth')  
}
  return (
    <div>

      {
        permission ? (       <div>
          {
              messages.length > 0 ? (messages.map((message)=> <Card key={message.message.clientId}>
                {
                  message.message.name ? <>
                               <Button onClick={() => handleClickOnMessage(message.message.clientId)}>
              <Card.Title>
                {
                
               
                   providerId === message.message.providerId ? 
                   message.message.name : null
                }
   
              </Card.Title>
            </Button>
                  </>:null
 
                }

            </Card>)):(<></>)
          }
          </div>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>  
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>  
        </div>)
      }

    </div>
  )
}

export default ProviderMessages
