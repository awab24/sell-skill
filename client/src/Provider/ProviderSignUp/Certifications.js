import React, { useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

function Certifications() {
  const [pdfCertificate, setPdfCertificate] = useState(null)
  const [imageCertificate, setImageCertificate] = useState(null)
  const navigate = useNavigate()


  const handlePDF = (async(e) => {


    const formData = new FormData();
    formData.append('pdf', e);
    formData.append('name', 'application/pdf');
    formData.append('id', uuidv4())
      await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPdfCertificate', formData)
  })
  const handleIMAGE = (async(e) => {


    const formData = new FormData();
    formData.append('image', e);
    formData.append('id', uuidv4())

   await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertImageCertificate', formData )
  })


    const handleNextClick = ( async()=> {

        navigate('/previous-experience')
      
    })


  return (
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
    <Container>
    <Card style={{'position': 'relative', 'top': '80px', 'height': '530px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '360px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '150px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Certifications here
        </b>

         </Card.Title>
<Card style={{'position': 'relative', 'top':'150px','left':'30px','width':'200px','height':'110px', 'backgroundColor':'black'}} onClick={handleIMAGE}>
    <b style={{'color':'white','position':'relative', 'left':'40px'}}>upload IMAGE</b>
    <br></br>
    <br></br>

</Card>
<input type="file" name="pdf"  accept="application/pdf" onChange={(e) => handlePDF(e.target.files[0])} style={{'color':'black', 'width':'100px', 'position':'relative','zIndex':'1', 'top':'105px', 'left':'430px'}} />

<Card style={{'position': 'relative', 'top':'15px','left':'380px','width':'200px','height':'110px','backgroundColor':'black'}} onClick={handlePDF}>
    <b style={{'color':'white','position':'relative', 'left':'50px'}}>upload PDF</b>
    <br></br>
    <br></br>

</Card>
<input type="file" name="image" accept="image/png" onChange={(e) => handleIMAGE(e.target.files[0])} style={{'color':'black', 'width':'100px', 'position':'relative', 'top':'-35px', 'left':'80px'}} />
{
    imageCertificate && <img src= {URL.createObjectURL(imageCertificate)} style={{'position':'relative','top':'135px','left':'224px', 'width':'140px', 'height':'140px', 'borderRadius':'40px'}}/>
}
  
<Button onClick={handleNextClick} style={{'position': 'absolute', 'top':'380px','left':'300px', 'width':'290px'}}>Next</Button>

      </Card>
    </Card>
    </Container>

  
    </div>
  )
}

export default Certifications
