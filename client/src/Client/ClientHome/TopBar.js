import React, { useEffect, useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Buffer } from 'buffer'


function TopBar() {
  const [checkNewMessages, setCheckNewMessages] = useState(false)
  const [newProposals, setNewProposals] = useState(false)
  const [profilePictureSrc, setProfilePictureSrc] = useState('')
  const [name, setName] = useState('')
  useEffect(() => {
    const fetchCheckClientNewMessage = async() => {
      const checkClientNewMessage = await axios.get('http://localhost:5000/api/endpoints/checkClientNewMessage')
      console.log('result of checking the new message ==> '+checkClientNewMessage.data)
      setCheckNewMessages(checkClientNewMessage.data)
    }
    fetchCheckClientNewMessage();
  },[])

  useEffect(() => {
    const checkNewProposal = async() => {
      const checkNewProposalResult = await axios.get('http://localhost:5000/api/endpoints/checkClientNewProposals')
      setNewProposals(checkNewProposalResult.data)
    }
    checkNewProposal();
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/endpoints/getClientProfileData').then(
      response => response.json()
    ).then(
      result => setName(JSON.stringify(result.name).replace(/"/g, ""))
    )
  }, [])
  
  useEffect(() => {
    const fetchImage = async() => {
      try{
        const response = await axios.get('http://localhost:5000/api/endpoints/getClientProfilePicture', {
          responseType: 'arraybuffer'
        });

        const base64 = Buffer.from(response.data, 'binary').toString('base64')
        const mimeType = response.headers['content-type'];
        setProfilePictureSrc(`data:${mimeType};base64,${base64}`)

      }catch(error){
        console.log(error.message)
      }
    }
    fetchImage();
  
  
  }, [name])
  return (

    <div>
      {
        checkNewMessages && <div style={{'backgroundColor':'red'}}>iuuuuuuuuuuuu</div>
      }
 
 {
  newProposals &&  <div style={{'backgroundColor':'red'}}>new proposal new proposal new proposal</div>
}
 
    <a href="/report" style={{'position':'relative', 'left': '120px', 'top':'40px', 'color': 'black'}}>Make report</a>
    <a href="/notifications" style={{'position':'relative', 'left': '140px', 'top':'40px', 'color': 'black'}}>Notifications and providers</a>
    <a href="/client-received-messages" style={{'position':'relative' , 'top':'40px', 'left':'170px', 'color':'black'}}>messages</a>
    <a href="/client-posts" style={{'position':'relative' , 'top':'40px', 'left':'200px', 'color':'black'}}>My posts</a>
    <Card style={{'position': 'relative','left': '1100px',  'width': '200px'}}>
      <Card.Title style={{'position': 'relative', 'left': '70px', 'top':'25px'}}>
          {
            name
          }
      </Card.Title>
      {
        profilePictureSrc.data ? 
        <img src={profilePictureSrc} style={{'width': '50px', 'height': '50px', 'borderRadius': '90px', 'position':'relative', 'top': '-13px'}}/> :<img src="/images/NormalProfile.jpg" style={{'height':'40px', 'width':'30px'}}/>
      }

    </Card>
    
  </div>
  )
}

export default TopBar
