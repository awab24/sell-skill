import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'


function ProviderToClientMessage() {
    let clientID = useSelector((state)=> state.allow.clientId)
    const [messageContent, setMessageContent] = useState('')

    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const handleProviderToClientMessage = async() => {
      await axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/sendProviderToClientMessage/${clientID}`,{_id: uuidv4(), message: messageContent})
    }
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getMessagesFromClientIntoProvider');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setMessages(result);  // Assuming result is an array or object directly
          } catch (error) {
            console.error('Failed to fetch posts:', error);
          }
        };
    
        fetchPosts();
      }, []);
    
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
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider',{headers:  
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

const deleteProviderMessage = async(e) => {
  console.log(e)
  await axios.delete('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/deleteProviderMessage/'+e)
}
  return (
    <div>
      {
        permission ? (    <div>
          <div>
          {
              messages.length > 0 ? (messages.map((message)=> <>
             
                <Card.Title>
                  {
          
                    
                     message.message.clientId === clientID ? 
                     <Card>{message.message.message}
                      <Button onClick={() => deleteProviderMessage(message.message._id)}>
                        <FaTrash/> Delete message
                     </Button>
                     </Card>:

                     <></>
                  }
              
                </Card.Title>
          
            </>)):(<></>)
          }
          </div>
          <Form>
            <Form.Control placeholder="enter a message" onChange={(e) => setMessageContent(e.target.value)}/>
          </Form>
      <Button onClick={handleProviderToClientMessage}>send</Button>
      </div>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>  
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>  
        </div>)
      }
    </div>
  )
}

export default ProviderToClientMessage
