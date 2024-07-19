import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(to bottom, #000428, #004e92);
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const StyledContainer = styled(Container)`
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const MessageCard = styled(Card)`
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: black;
  border-radius: 12px;
  margin-top: 20px;
`;

const SignUpCard = styled(Card)`
  width: 400px;
  text-align: center;
`;

function ProviderToClientMessage() {
  const clientID = useSelector((state) => state.allow.clientId);
  const [messageContent, setMessageContent] = useState('');
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [permission, setPermission] = useState(false);
  const tokenString = localStorage.getItem('providerToken');
  const tokenObject = JSON.parse(tokenString);
  const token = tokenObject?.token || tokenObject;

  const handleProviderToClientMessage = async () => {
    await axios.post(`https://sell-skill.com/api/endpoints/sendProviderToClientMessage/${clientID}`, { _id: uuidv4(), message: messageContent });
    setMessageContent()
   
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill.com/api/endpoints/getMessagesFromClientIntoProvider');
        const result = await response.json();
        setMessages(result);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/verifyProvider', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermission(response.data.permission);
    };

    fetchPermission();
  }, [token]);

  const navigateSignUpIn = () => {
    navigate('/auth');
  };

  const deleteProviderMessage = async (id) => {
    await axios.delete('https://sell-skill.com/api/endpoints/deleteProviderMessage/' + id);
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer fluid className="py-5">
        {permission ? (
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageCard key={message._id}>
                      {message.message.clientId === clientID && (
                        <>
                        {
                          message.message.response === true? 
                          <span style={{'backgroundColor':'white'}}>{message.message.message}</span>
                          :  <span><b style={{'color':'white'}}>{message.message.message}</b></span>
                        }


                          <Button variant="danger" onClick={() => deleteProviderMessage(message._id)} style={{'position':'relative', 'left':'300px'}}>
                            <FaTrash /> 
                          </Button>
                        </>
                      )}
                    </MessageCard>
                  ))
                ) : (
                  <Card className="mb-3">
                    <Card.Body>No messages available.</Card.Body>
                  </Card>
                )}
              </div>
              <Form className="mt-3">
                <Form.Control
                  placeholder="Enter a message"
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="mb-3"
                />
                <Button variant="primary" onClick={handleProviderToClientMessage}>
                  Send
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <SignUpContainer>
            <SignUpCard className="p-4">
              <Button variant="primary" onClick={navigateSignUpIn}>
                Sign up/in
              </Button>
            </SignUpCard>
          </SignUpContainer>
        )}
      </StyledContainer>
    </>
  );
}

export default ProviderToClientMessage;





















// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
// import { FaTrash } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import styled, { createGlobalStyle } from 'styled-components';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const GlobalStyle = createGlobalStyle`
//   body, html {
//     margin: 0;
//     padding: 0;
//     height: 100%;
//     background: linear-gradient(to bottom, #000428, #004e92);
//     color: #ffffff;
//     font-family: Arial, Helvetica, sans-serif;
//   }
// `;

// const StyledContainer = styled(Container)`
//   margin-top: 20px;
//   padding: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 12px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
// `;

// const MessageCard = styled(Card)`
//   margin: 10px 0;
//   background: rgba(255, 255, 255, 0.2);
//   border: none;
//   border-radius: 8px;
//   padding: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const SignUpContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 200px;
//   background-color: black;
//   border-radius: 12px;
//   margin-top: 20px;
// `;

// const SignUpCard = styled(Card)`
//   width: 400px;
//   text-align: center;
// `;

// function ProviderToClientMessage() {
//   const clientID = useSelector((state) => state.allow.clientId);
//   const [messageContent, setMessageContent] = useState('');
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [permission, setPermission] = useState(false);
//   const tokenString = localStorage.getItem('providerToken');
//   const tokenObject = JSON.parse(tokenString);
//   const token = tokenObject?.token || tokenObject;

//   const handleProviderToClientMessage = async () => {
//     await axios.post(`https://sell-skill.com/api/endpoints/sendProviderToClientMessage/${clientID}`, { _id: uuidv4(), message: messageContent });
//     setMessageContent('')
   
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('https://sell-skill.com/api/endpoints/getMessagesFromClientIntoProvider');
//         const result = await response.json();
//         setMessages(result);
//       } catch (error) {
//         console.error('Failed to fetch posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     const fetchPermission = async () => {
//       const response = await axios.get('https://sell-skill.com/api/endpoints/verifyProvider', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setPermission(response.data.permission);
//     };

//     fetchPermission();
//   }, [token]);

//   const navigateSignUpIn = () => {
//     navigate('/auth');
//   };

//   const deleteProviderMessage = async (id) => {
//     await axios.delete('https://sell-skill.com/api/endpoints/deleteProviderMessage/' + id);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <StyledContainer fluid className="py-5">
//         {permission ? (
//           <Row className="justify-content-center">
//             <Col xs={12} md={8} lg={6}>
//               <div>
//                 {messages.length > 0 ? (
//                   messages.map((message) => (
//                     <MessageCard key={message._id}>
//                       {message.message.clientId === clientID && (
//                         <>
//                         {
//                           message.message.response === true? 
//                           <span style={{'backgroundColor':'white'}}>{message.message.message}</span>
//                           :  <span><b style={{'color':'white'}}>{message.message.message}</b></span>
//                         }


//                           <Button variant="danger" onClick={() => deleteProviderMessage(message._id)} style={{'position':'relative', 'left':'300px'}}>
//                             <FaTrash /> 
//                           </Button>
//                         </>
//                       )}
//                     </MessageCard>
//                   ))
//                 ) : (
//                   <Card className="mb-3">
//                     <Card.Body>No messages available.</Card.Body>
//                   </Card>
//                 )}
//               </div>
//               <Form className="mt-3">
//                 <Form.Control
//                   placeholder="Enter a message"
//                   onChange={(e) => setMessageContent(e.target.value)}
//                   className="mb-3"
//                 />
//                 <Button variant="primary" onClick={handleProviderToClientMessage}>
//                   Send
//                 </Button>
//               </Form>
//             </Col>
//           </Row>
//         ) : (
//           <SignUpContainer>
//             <SignUpCard className="p-4">
//               <Button variant="primary" onClick={navigateSignUpIn}>
//                 Sign up/in
//               </Button>
//             </SignUpCard>
//           </SignUpContainer>
//         )}
//       </StyledContainer>
//     </>
//   );
// }

// export default ProviderToClientMessage;
