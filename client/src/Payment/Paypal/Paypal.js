import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const PayPalCheckout = ({  description, onSuccess }) => {
  const amount = useSelector((state) => state.allow.amount)
  console.log('amount => =. => '+amount)
  
  const [paid, setPaid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  

  const initialOptions = {
    currency: 'USD', // Adjust currency code if needed
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
    <>
    {
      permission ? (    <PayPalScriptProvider options={initialOptions}>

        <PayPalButtons

createOrder={(data, actions) => {

  return actions.order.create({
    purchase_units: [{
      amount: {
        value: amount, // Use the amount prop passed to the component
      },
      description: description, // Use the description prop passed to the component
    }],
  });
  
}}

onApprove={(data, actions) => {
  return actions.order.capture().then(async(details) => {
    setPaid(true);
    setCompleted(true);
    axios.post('http://localhost:5000/api/endpoints/payProvider', {providerAmount: (amount * 70)/100})
    onSuccess(details);
   
  }

);
  
}

}
onError={(err) => {
  setError(err);
  console.error('PayPal Checkout onError', err);
}}
        />


    </PayPalScriptProvider>): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
    }
    </>
  );
}

export default PayPalCheckout;
