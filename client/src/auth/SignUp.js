import React from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'

function SignUp() {
  return (
    <div  style={{'backgroundColor': 'blue','height': '633px'}}>
  <Container >
    <Card style={{'position':'relative', 'top': '30px', 'height':'550px', 'borderRadius':'30px', 'backgroundColor':'black'}}>
    <Card style={{'position':'relative', 'top': '30px', 'borderRadius':'30px', 'backgroundColor':'black', 'width': '700px',}}>
        <Card.Title style={{'position':'relative', 'top':'40px', 'left': '500px', 'color': 'blue', 'fontSize': '20px  '}}>
          Sign up
        </Card.Title>
          <Form style={{'position': 'relative', 'top': '80px','left':'230px',  'width': '630px'}}>
            <Form.Control placeholder='name'/>
          </Form>
          <Form style={{'position': 'relative', 'top': '90px','left':'230px',  'width': '630px'}}>
            <Form.Control placeholder='surname'/>
          </Form>
          <Form style={{'position': 'relative', 'top': '100px','left':'230px',  'width': '630px'}}>
            <Form.Control placeholder='email'/>
          </Form>
          <Form style={{'position': 'relative', 'top': '110px','left':'230px',  'width': '630px'}}>
            <Form.Control placeholder='password'/>
          </Form>
          <Form style={{'position': 'relative', 'top': '120px','left':'230px',  'width': '630px'}}>
            <Form.Control placeholder='confrim password'/>
          </Form>
          
          <Button style={{'position':'relative', 'top': '150px' ,'left':'150px',  'width': '800px', 'height': '45px', 'borderRadius': '30px'}}>
            Sign up
          </Button>
          <a href="/auth" style={{'position':'relative', 'top': '170px', 'left': '400px'}}>
            already have an account?! let's sign in
          </a>
<div style={{'position': 'relative', 'top': '180px', 'left': '420px'}}>
<GoogleLogin />
</div>

      </Card>   
    </Card>
    
    </Container>
    </div>
  
  )
}

export default SignUp


