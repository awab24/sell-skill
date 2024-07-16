import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

function ClientProfilePicture() {
    const [picture, setPicture]= useState('')
    const navigate = useNavigate()
const handleNextClick = () => {
  navigate("/client-category")
}
      const handleUploadClick = (async(e) => {
        
        e.preventDefault();
          const formData = new FormData();
          formData.append('picture', picture)
          formData.append('name', 'img/png')
            await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertClientPicture', formData)
 })
  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '80px', 'height': '530px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '360px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '150px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        A nice profile picture
        </b>

         </Card.Title>
<Button style={{'position': 'relative', 'top':'130px','left':'110px','width':'350px'}}>
<input type="file" name="picture" onChange={(e) => setPicture(e.target.files[0])} style={{'color':'black'}}/>

</Button>
{
    picture && <img src= {URL.createObjectURL(picture)} style={{'position':'relative','top':'135px','left':'224px', 'width':'140px', 'height':'140px', 'borderRadius':'40px'}}/>
}
  <a href="/type-of-work">
  <Button onClick={handleUploadClick} style={{'position': 'relative', 'top':'240px','left':'300px', 'width':'290px'}}>Upload</Button>
  </a>

<Button onClick={handleNextClick} style={{'position': 'relative', 'top':'240px','left':'300px', 'width':'290px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>
  )
}

export default ClientProfilePicture
