import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ClientMessages() {
  const [messageContent, setMessageContent] = useState('');
  const [receivedMessages, setReceivedMessages] = useState('')
  const providerId = useSelector((state) => state.allow.proposalId);
  const navigate = useNavigate()
console.log(providerId)
const auth = localStorage.getItem('authenticated')
const tokenString = localStorage.getItem('clientToken')
const tokenObject = JSON.parse(tokenString)
const token = tokenObject.token


useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/endpoints/getProviderToClientMessagesInClient');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setReceivedMessages(result);  // Assuming result is an array or object directly
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  fetchPosts();
}, []);

console.log(receivedMessages)



  const handleSend = async () => {
    try {
      const message = {
        _id: providerId, // Include the _id here
        message: messageContent
      };

      await axios.post(`http://localhost:5000/api/endpoints/sendMessageFromClientToProvider/${providerId}`, { message });

      setMessageContent(''); // Clear message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (show error message, etc.)
    }
  };



  const [permission, setPermission] = useState(false)





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
    permission ? (
      <div>
      {
        receivedMessages.length > 0 ?(
          receivedMessages.map ((receivedMessage) => 
            
            receivedMessage.message.providerId === providerId ? 

            <Card>
          <Card.Body>
            {
              receivedMessage.message.message
            }

          </Card.Body> 

        </Card> : <></>
          )
   
          )
           : 
           (<></>)
      }
      <Form>
        <Form.Control
          type="text"
          placeholder="Insert your message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </Form>
    </div>
    ): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>
      <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>
    </div>)
  
  );
}

export default ClientMessages;
