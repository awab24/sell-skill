import React from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function CallInviteBlocks() {
  return (
    <Container>
    <a style={{'cursor':'pointer','color':'black'}} href="/posting-term">

    <Card style={{'position': 'relative','top':'80px','left':'80px', 'width': '350px', 'height': '80px', 'backgroundColor':'black', 'color':'blue'}}>
        <Card.Title>
            <b style={{'position':'relative', 'left':'115px', 'top':'20px'}}>
            make a call
            </b>

        </Card.Title>
    
    </Card>
    </a>
    
    <a style={{'cursor':'pointer', 'color':'black'}} href="/inviting">

<Card style={{'position': 'relative', 'left':'700px','width': '350px', 'height': '80px',  'backgroundColor':'black', 'color':'blue'}}>
<Card.Title>
<b style={{'position':'relative', 'left':'80px', 'top':'20px'}}>
         invite some provider
            </b>
</Card.Title>

</Card>
</a>
  
</Container>
  )
}

export default CallInviteBlocks
