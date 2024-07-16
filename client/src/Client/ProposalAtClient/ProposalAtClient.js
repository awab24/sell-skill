import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function ProposalAtClient() {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate()
  const proposalId = useSelector((state) => state.allow.proposalId);
  const handleAccept = () => {
    navigate("/accept")
  }
  const handleMessage=()=>{
    navigate("/client-messages")
  }
  const handleSeeProfile = async()=>{
    navigate("/provider-profile")
    await axios.post('http://localhost:5000/api/endpoints/proposalId/'+proposalId)
  
    
  }

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/endpoints/getProposals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProposals(result);
        console.log(proposals.length)
        proposals.map((proposal) => {
          console.log('proposalId ===> '+proposal.proposalId)
          console.log('proposal itself ===> '+proposal.proposal)
        })
      } catch (error) {
        console.error('Failed to fetch proposals:', error);
      }
    };

    fetchProposals();
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
    <div style={{'backgroundColor':'blue'}}>
   {
    permission ?    proposals.length > 0 ? proposals.map((proposal) =>
      proposalId === proposal.proposalId ? (
        <Container>
        <Card key={proposal.proposalId} style={{'backgroundColor':'black', 'height':'633px'}}>
          <Card.Title style={{ 'color':'blue' }}>
            proposal content
          </Card.Title>
          <Card.Body style={{ 'color':'white'}}>
          {proposal.proposal.substring(2, proposal.proposal.length -5)}
          </Card.Body>
        <div style={{'backgroundColor':'lightgray', 'height':'150px'}}>
        <Button style={{'width':'200px', 'position':'relative','top':'40px', 'left':'110px'}} onClick={handleAccept}>Accept</Button>
    <Button style={{'width':'200px','position':'relative', 'left':'280px', 'top':'40px'}} onClick={handleMessage}>Message</Button>
    <Button style={{'width':'200px','position':'relative', 'left':'470px', 'top':'37px'}} onClick={handleSeeProfile}>See Profile</Button>
        </div>

        </Card>
        </Container>

      ) : (<div>empty prop</div>)
    ) : (
      <p>empty proposal</p>
    )
 :(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
  <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
</div>)
   }

    </div>
  );
}

export default ProposalAtClient;
