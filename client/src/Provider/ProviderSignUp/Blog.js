import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Blog() {
    const navigate = useNavigate()
    const [intro, setIntro] = useState('')
   const  handleAddBlog = async(e) => {
    
    const formData = new FormData()
    setIntro(e)
    formData.append('image', e)
    formData.append('name', 'image/png')
    console.log(formData)
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/addBlog' , formData)
    }
    const handleNextClick =(async() => {
      navigate('/rate-per-hour')

    })
  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '80px', 'height': '530px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '360px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '215px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
          Intro video or you can do it latter
        </b>

         </Card.Title>


<Button style={{'position': 'relative', 'top':'150px','left':'220px','width':'150px'}}>
    <b>Image blog</b>
    <br></br>
    <br></br>
<input type="file"  name='image' onChange={(e) => handleAddBlog(e.target.files[0])}  style={{'color':'black', 'width':'100px'}} />
</Button>
{
    intro && <img src= {URL.createObjectURL(intro)} style={{'position':'relative','top':'135px','left':'224px', 'width':'140px', 'height':'140px', 'borderRadius':'40px'}}/>
}
  
<Button onClick={handleNextClick} style={{'position': 'relative', 'top':'280px','left':'300px', 'width':'290px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>
  )
}

export default Blog