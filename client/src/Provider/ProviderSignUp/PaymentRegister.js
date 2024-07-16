import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function PaymentRegister() {
  const [paypalEmail, setPaypalEmail] = useState('')
    const navigate = useNavigate()
    const handleNext = async() => {
        navigate("/provider")
        await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPaypalEmail', {paypalEmail: paypalEmail})
    }
  return (
    <div>
      <input placeholder="enter your correct paypal email" onChange={(e) => setPaypalEmail(e.target.value)}/>
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}

export default PaymentRegister
