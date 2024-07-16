import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

function PreviousExperience() {
  const [pdfExperience, setPdfExperience] = useState(null)
  const [imageExperience, setImageExperience] = useState(null)
  const navigate = useNavigate()


  const handlePDF = (async(e) => {
 
    const formData = new FormData();
    formData.append('experiencePdf', e);
    formData.append('id', uuidv4())
    
      await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfExperience', formData)
  })
  const handleIMAGE = (async(e) => {

    const formData = new FormData();
    formData.append('experienceImage', e);
    formData.append('id', uuidv4())


   await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageExperience', formData )
  })


    const handleNextClick = ( async()=> {
        navigate('/blog')
      
    })


  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '80px', 'height': '530px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '360px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '150px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Previous experience
        </b>

         </Card.Title>
<Card style={{'position': 'relative', 'top':'160px','left':'30px','width':'200px','height':'110px', 'backgroundColor':'black'}} onClick={handleIMAGE}>
    <b style={{'color':'white', 'position':'relative', 'left':'35px'}}>upload IMAGE</b>
    <br></br>
    <br></br>

</Card>
<input type="file" name="experiencePdf"  accept="application/pdf" onChange={(e) => handlePDF(e.target.files[0])} style={{'color':'black', 'width':'100px', 'position':'relative','zIndex':'1', 'top':'120px', 'left':'370px'}} />











<Card style={{'position': 'relative', 'top':'25px','left':'350px','width':'200px','height':'110px', 'backgroundColor':'black'}} onClick={handlePDF}>
    <b style={{'color': 'white','position':'relative', 'left':'40px'}}>upload PDF</b>
    <br></br>
    <br></br>

</Card>
<input type="file" name="experienceImage" accept="image/png" onChange={(e) => handleIMAGE(e.target.files[0])} style={{'color':'black', 'width':'100px', 'position':'relative', 'top':'-36px', 'left':'90px','zIndex':'1',}} />
{
    imageExperience && <img src= {URL.createObjectURL(imageExperience)} style={{'position':'relative','top':'135px','left':'224px', 'width':'140px', 'height':'140px', 'borderRadius':'40px'}}/>
}
  
<Button onClick={handleNextClick} style={{'position': 'absolute', 'top':'380px','left':'300px', 'width':'290px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>
  )
}

export default PreviousExperience
