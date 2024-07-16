import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RatePerHour() {
    const [rate, setRate] = useState()
    const navigate = useNavigate()
    const handleNextClick = async () => {
      navigate("/payment-register");
      await axios.post('http://localhost:5000/api/endpoints/addRate', { ratePerHour: rate });
    }
    
  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '100px', 'height': '500px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '330px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '180px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Rate per hour
        </b>

         </Card.Title>
         <Form style={{'position': 'relative', 'top': '130px','left':'30px', 'borderRadius': '90px', 'width':'500px'}} >
             <Form.Control placeholder='How much you wanna take per hour?' onChange={(e)=> setRate(e.target.value )} />
        </Form>
  
<Button onClick={handleNextClick} style={{'position': 'relative', 'top':'200px','left':'35px', 'width':'500px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>
  )
}

export default RatePerHour
