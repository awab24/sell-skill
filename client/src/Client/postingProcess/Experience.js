import React, { useEffect, useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOverviewExperience } from '../../reducers/reducers'
import axios from 'axios'


function Experience() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const previousPostData = useSelector((state)=> state.allow.overview)
    const [postData, setPostData] = useState(previousPostData)
    const handleNextClick = () => {
      dispatch(setOverviewExperience(postData))
      navigate("/posting-pudget")
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
           `Bearer ${token}`
          
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
      <Card style={{'position':'relative','top':'50px','left':'230px','backgroundColor': 'blue', 'width': '670px', 'height': '330px','borderRadius':'40px'}}>
      <Card.Title style={{'position': 'absolute', 'left': '210px', 'display':'flex', 'top': '30px', 'fontSize': '25px', }}>
        <b style={{'color': 'black'}}>
        your request needs a 
        </b>

         </Card.Title>

         <Button style={{'position':'relative', 'top':'90px','left':'22px', 'width':'200px', 'height':'100px', 'color':'black', 'fontSize':'18px'}} onClick={()=> setPostData({...postData, experience: 'Senior'})}><b>Senior</b></Button>
         <Button style={{'position':'relative', 'top':'100px','left':'235px', 'width':'200px', 'height':'100px', 'color':'black', 'fontSize':'18px'}} onClick={()=> setPostData({...postData, experience: 'medium'})}><b>medium</b></Button>
         <Button style={{'position':'relative', 'top':'-100px','left':'450px', 'width':'200px', 'height':'100px', 'color':'black', 'fontSize':'18px'}} onClick={()=> setPostData({...postData, experience: 'Junior'})}><b>Junior</b></Button>
<Button style={{'position':'relative', 'top':'60px','left':'430px', 'width':'200px', }} onClick={handleNextClick}>Next</Button>

      </Card>
    
    

    

    
    </Card>
    </Container>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
}

    </div>
  )
}

export default Experience
