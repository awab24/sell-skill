import React, { useEffect, useState } from 'react';
import CallInviteBlocks from './CallInviteBlocks';
import TopBar from './TopBar';
import ImgSlider from './ImgSlider';
import RelatedTeachers from './RelatedTeachers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Card, Button } from 'react-bootstrap';


function MainHome() {
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
    
   
    <div style={{'backgroundColor': 'blue', 'min-height': '100vh', 'padding-bottom':'360px'}}>
      {
        permission ? (<>
                <TopBar/>
        <ImgSlider/>
     <CallInviteBlocks/>
        <RelatedTeachers/> 
        </>): (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>
        </div>)

      }

   
     

    </div>
  

  );
}

export default MainHome;

