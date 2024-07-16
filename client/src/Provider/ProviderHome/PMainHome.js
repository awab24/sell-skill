  import React, { useEffect, useState } from 'react'
  import TopBar from './TopBar'
  import Jobs from './Jobs'
  import ImgSlider from './ImgSlider'
  import { Container } from 'react-bootstrap'
  import { useSelector } from 'react-redux'
  import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

  function PMainHome() {
    const [permission, setPermission] = useState(false)
    const tokenString = localStorage.getItem('providerToken')
  const tokenObject = JSON.parse(tokenString)
  const token = tokenObject?.token
const navigate = useNavigate()

    useEffect(() => {
      const fetchPermission = async() => {
        const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyProvider',{headers:
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
      <div  style={{'background':'blue', 'height':'1800px', 'width':'1500px', 'min-height': '100vh', 'padding-bottom':'360px',}}>
        {
          permission ? (<>
              <Container style={{'position':'relative', 'left':'-200px'}}>
        <TopBar />
        <ImgSlider/>
        <Jobs/>
      </Container></>):  (<div style={{'position':'relative','top':'170px','left':'270px', 'backgroundColor':'black', 'height':'200px', 'width':'800px'}}>
          <Card style={{'width':'400px', 'position':'relative','top':'50px','left':'190px' }}><Button onClick={navigateSignUpIn}>sign up/in</Button></Card>
        </div>)
        }

      </div>

    )
  }

  export default PMainHome
