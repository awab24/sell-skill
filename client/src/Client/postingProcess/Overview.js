import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function Overview() {
const postData = useSelector((state) => state.allow.overview)
const handlePost= async()=>{
  console.log('last post data ===> ' +postData)
 await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertPost', postData)
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
const navigate = useNavigate() 
 
 
 
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
    <div  style={{'backgroundColor': 'blue','height': '1033px'}}>
      {
        permission ? (  <Container >
          <Card style={{'position':'relative', 'top': '30px', 'height':'750px', 'borderRadius':'30px', 'backgroundColor':'black'}}>
          <Card style={{'position':'relative', 'top': '30px', 'borderRadius':'30px', 'backgroundColor':'black', 'width': '700px',}}>
              <Card.Title style={{'position':'relative', 'top':'10px', 'left': '500px', 'color': 'blue', 'fontSize': '20px  '}}>
                overview
          
              </Card.Title>
      
            </Card>   
      
            <Card style={{'position':'relative', 'top': '90px','left':'5px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                term
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.term
                }
                </div>
               
              </Card.Title>
      
            </Card>  
      
            <Card style={{'position':'relative', 'top': '5px','left':'680px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                title
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.title
                }
                </div>
               
              </Card.Title>
      
            </Card> 
      
            <Card style={{'position':'relative', 'top': '80px','left':'680px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                skills
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.skills
                }
                </div>
               
              </Card.Title>
      
            </Card> 
      
            <Card style={{'position':'relative', 'top': '-20px','left':'5px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                Estimate scope
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.scope
                }
                </div>
               
              </Card.Title>
      
            </Card>  
            
      
            <Card style={{'position':'relative', 'top': '50px','left':'5px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                experince level
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.experience
                }
                </div>
               
              </Card.Title>
      
            </Card>  
            
          </Card>
      
          
          <Card style={{'position':'relative', 'top': '-260px','left':'680px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '400px','height':'90px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '120px', 'color': 'blue', 'fontSize': '20px  '}}>
                pudget
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.pudget
                }
                </div>
               
              </Card.Title>
      
            </Card> 
          
            <Card style={{'position':'relative', 'top': '-210px','left':'200px',  'borderRadius':'30px', 'backgroundColor':'blue', 'width': '700px','height':'120px'}}>
              <Card.Title style={{'position':'relative', 'top':'-40px', 'left': '270px', 'color': 'blue', 'fontSize': '20px  '}}>
                description
                <div style={{'color': 'black','position':'relative',  'top':'45px', 'left':'40px'}}>
                {
                  postData.description
                }
                </div>
               
              </Card.Title>
      
            </Card> 
            <Button style={{'position':'relative', 'top':'-140px', 'left':'280px', 'width':'600px', 'height':'50px'}} onClick={handlePost}>Post</Button>
          </Container>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    </div>
  )
}

export default Overview
