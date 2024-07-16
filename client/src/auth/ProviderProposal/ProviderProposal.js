import React, { useEffect, useState } from 'react'
import { Card,Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ProviderProposal() {
    const [proposal, setProposal] = useState('')
    const handleProposalSubmit = async() => {
        await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/submitProposal', proposal)
    }

    const [permission, setPermission] = useState(false)  
let token;  
const tokenString = localStorage.getItem('providerToken')  
const tokenObject = JSON.parse(tokenString)  
token = tokenObject.token  
if(!token){  
  token = tokenObject  
}  
console.log('token from mainHome => '+ token)  
const navigate = useNavigate()  
  
  
  
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
  return (
    <div>
      {
        permission ? (<>
                <Form>
            <Form.Control placeholder='enter your proposal' onChange={(e)=> setProposal(e.target.value)}/>
        </Form>
        <Button onClick={handleProposalSubmit}>Submit</Button></>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>  
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>  
        </div>)
      }
    </div>
  )
}

export default ProviderProposal
