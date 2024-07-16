import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'

function ReceivedMessages2Client() {
    let providerId = useSelector((state) => state.allow.providerId)
    const [receivedMessages, setReceivedMessages] = useState('')
    const [messageContent, setMessageContent] = useState('')
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getProviderToClientMessagesInClient');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setReceivedMessages(result);  // Assuming result is an array or object directly
            receivedMessages.map((message) => console.log(message))
          } catch (error) {
            console.error('Failed to fetch posts:', error);
          }
        };
      
        fetchPosts();
      }, []);

      const handleSend = async () => {
        try {
          const message = {
            messageId: uuidv4(),
            providerId: providerId, // Include the _id here
            message: messageContent
          };
    
          await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendMessageFromClientToProvider/${providerId}`, { message });
    
          setMessageContent(''); // Clear message input after sending
        } catch (error) {
          console.error('Error sending message:', error);
          // Handle error (show error message, etc.)
        }
      };

      const [permission, setPermission] = useState(false) 
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

const deleteClientMessage = async(e) => {
  receivedMessages.map((receivedMessage) => console.log(receivedMessage))
  console.log('id of the message that will be deleted client side => => '+e)
  await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteClientMessage/'+e)
}
  return (
    <div>
      {
        permission ? (
          <div>
          {
            receivedMessages.length > 0 ?
            (receivedMessages.map ((receivedMessage) => 
                receivedMessage.message.providerId === providerId ? 
            <Card>
                {
                    receivedMessage.message.message
                }
                          <Button onClick={ () => deleteClientMessage(receivedMessage.message._id)}>
              <FaTrash />Delete message
            </Button>
            </Card>
            :<></>
            ))
            :
            <></>
          }
          <Form>
            <Form.Control placeholder="enter a message" onChange={(e) => setMessageContent(e.target.value)}/>
          </Form>
                  <Button onClick={handleSend}>Send</Button>
        </div>
        ): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  )
}

export default ReceivedMessages2Client
