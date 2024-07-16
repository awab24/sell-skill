import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProposalId } from '../../reducers/reducers';
import axios from 'axios';

function ClientNotifications() {
    const navigate = useNavigate();
    const [incomingProvidersData, setIncomingProvidersData] = useState([]);
    const dispatch = useDispatch();

    const handleButtonClick = (id) => {
        dispatch(setProposalId(id));
        console.log('click => ' + id);
        navigate('/proposal');
    };

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/endpoints/incomingProviderData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setIncomingProvidersData(result);
                console.log(result);
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
 
  useEffect(() => {
    const killProposalNewNotification =async () => {
      await axios.patch('http://localhost:5000/api/endpoints/cancelClientNewProposals')
    }
    killProposalNewNotification();
 }, [])
const navigateSignUpIn = () => { 
  navigate('/auth') 
}



    return (
        <div style={{ 'backgroundColor': 'blue', 'height': '633px' }}>
            {
                permission ? (            <Container>
                    {incomingProvidersData.length > 0 ? (
                        incomingProvidersData.map((proposal, index) => (
                            <div key={index} style={{ 'backgroundColor': 'blue', 'paddingBottom': '36px', 'width': '1366px', 'position': 'relative', 'left': '-125px' }}>
                                <div>
                                  
                                </div>
                                <Card style={{ 'backgroundColor': 'black', 'color': 'blue', 'width': '700px', 'position': 'relative', 'left': '290px', 'top': '30px' }}>
                                    <Button onClick={() => handleButtonClick(proposal.incomingProvider._id)}>
                                        <Card.Title style={{ 'color': 'black' }}>You got a proposal from</Card.Title>
                                        <Card.Body>
                                            Name: {proposal.incomingProvider.providerName}
                                        </Card.Body>
                                        <Card.Body>
                                            Email: {proposal.incomingProvider.providerEmail}
                                        </Card.Body>
                                    </Button>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p>There aren't any proposals</p>
                    )}
                </Container>): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
            }
        </div>
    );
}

export default ClientNotifications;
