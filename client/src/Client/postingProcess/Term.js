import React, { useEffect, useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { useDispatch } from 'react-redux'
import { setOverviewTerm } from '../../reducers/reducers'
import axios from 'axios'

function Term() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [postData, setPostData] = useState({_id:uuidv4(), term:'', title:'', skills:[], estimate:'', experience:'', pudget:'', description:''})
    const handleNextClick = () => {
    dispatch(setOverviewTerm(postData))
    navigate("/posting-title")
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
      const response = await axios.get('http://localhost:5000/api/endpoints/verifyClient',{headers: 
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
    <div  style={{'backgroundColor': 'blue','height': '633px'}}>
      {
        permission ? (    <Container >
          <Card style={{'position':'relative', 'top': '30px', 'height':'550px', 'borderRadius':'30px', 'backgroundColor':'black'}}>
          <Card style={{'position':'relative', 'top': '30px', 'borderRadius':'30px', 'backgroundColor':'black', 'width': '700px',}}>
              <Card.Title style={{'position':'relative', 'top':'40px', 'left': '430px', 'color': 'blue', 'fontSize': '23px  '}}>
               <b> Is it one time or a lot?</b>
              </Card.Title>
              <div style={{'width':'100px'}}>
              <Button style={{'cursor':'pointer' , 'color':'blue' }} onClick={handleNextClick}>
    
    <Card style={{'position':'relative','top':'120px','left':'70px', 'backgroundColor':'blue', 'height': '300px', 'width':'300px', 'color':'black'}}>
    
                <Card.Title>
                    <b style={{'position': 'relative', 'top':'120px', 'left':'80px'}}>Only one call</b>
                </Card.Title>
         
              </Card>
              </Button>
              </div>
      
    
         
         <Button style={{'cursor':'pointer', 'color':'blue'}}  onClick={handleNextClick}>
         <Card style={{'position':'absolute','top':'167px','left':'740px', 'backgroundColor':'blue', 'height': '300px', 'width':'300px', 'color':'black'}}>
        <Card.Title>
            <b  style={{'position': 'relative', 'top':'120px', 'left':'130px'}}>
            Alot
            </b>
           
        </Card.Title>
    </Card>
         </Button>
    
            </Card>  
            
          </Card>
          
          </Container>):(<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}> 
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card> 
        </div>)
      }
    
      </div>
  )
}

export default Term
