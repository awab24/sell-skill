import React, { useEffect, useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { setOverviewTitle } from '../../reducers/reducers'
import axios from 'axios'


function Title() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const previousPostData = useSelector((state) => state.allow.overview)
  console.log(previousPostData)
  const [postData, setPostData] = useState(previousPostData)
  const handleNextClick = () => {
    dispatch(setOverviewTitle(postData))
    navigate("/posting-skills")
    console.log(postData)
  }

  const [permission, setPermission] = useState(false) 
let token; 
const tokenString = localStorage.getItem('clientToken') 
const tokenObject = JSON.parse(tokenString) 
token = tokenObject.token 
if(!token){ 
  token = tokenObject 
} 
console.log('token from mainHome => '+ token) 

 
 
  useEffect(() => { 
    const fetchPermission = async() => { 
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient',{headers: 
        { 
         Authorization:  
           `Bearer ${token} `
          
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
    <div  style={{'height':'630px','backgroundColor': 'blue'}}>
{
  permission ? (    <Container>
    <Card style={{'position': 'relative', 'top': '100px', 'height': '500px', 'backgroundColor': 'black', 'color': 'blue', 'borderRadius': '40px'}}>
      <Card style={{'position':'relative','top':'50px','left':'270px','backgroundColor': 'blue', 'width': '600px', 'height': '330px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '260px', 'display':'flex', 'top': '50px', 'fontSize': '30px', }}>
        <b style={{'color': 'black'}}>
        Title
        </b>

         </Card.Title>
         <Form style={{'position': 'relative', 'top': '130px','left':'30px', 'borderRadius': '90px', 'width':'500px'}} >
             <Form.Control placeholder='enter a title that describes your post ' onChange={(e)=> setPostData({...previousPostData, title:e.target.value })} />
        </Form>
  
<Button onClick={handleNextClick} style={{'position': 'relative', 'top':'200px','left':'35px', 'width':'500px'}}>Next</Button>

      </Card>
    </Card>
    </Container>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
}

  
    </div>

  )
}

export default Title


