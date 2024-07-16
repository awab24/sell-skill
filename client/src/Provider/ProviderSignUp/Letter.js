import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Letter() {
    const [letter, setLetter] = useState('')
    const navigate = useNavigate()
    const handleNextClick = async() => {
        navigate("/certifications")
        await axios.post('http://localhost:5000/api/endpoints/insertLetter',letter)
    }

  return (
    <div  style={{'height':'930px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '100px', 'height': '800px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px', 'width':'1100px'}}>
      <Card style={{'position':'relative','top':'50px','left':'170px','backgroundColor': 'blue', 'width': '800px', 'height': '630px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '320px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Cover letter
        </b>

         </Card.Title>
         <Form style={{ position: 'relative', top: '130px', left: '120px', borderRadius: '90px', width: '600px' }}>
        <Form.Control
          as="textarea" // Use 'textarea' to allow multi-line input
          placeholder="Enter a cover letter for your profile"
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          style={{ height: '400px', borderRadius: '30px' }}
        />
      </Form>
  
<Button onClick={handleNextClick} style={{'position': 'relative', 'top':'290px','left':'490px', 'width':'300px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>

  )
}

export default Letter
