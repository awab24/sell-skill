import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAmount } from '../reducers/reducers'
import {Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function ChooseMethod() {
const dispatch = useDispatch()
const navigate = useNavigate()
const [paypalAmount, setPaypalAmount] = useState(null)
const handlePaypalClick = () => {
  console.log('paypal amount => => '+paypalAmount)
  dispatch(setAmount(paypalAmount ))
  navigate('/paypal')
 
}

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
        permission ? (<>      <input placeholder='enter the amount you wanna pay' onChange={(e) => (setPaypalAmount(e.target.value)) }/>
        <a style={{'cursor':'pointer'}} href="/stripe">
          Stripe
        </a>
        <br></br>
        <br></br>
        <br></br>
        <Button onClick={handlePaypalClick}>
        paypal
        </Button>
    </>): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  )
}

export default ChooseMethod
