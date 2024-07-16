import React, { useEffect, useState } from 'react'
import {Button, Alert, Breadcrumb, Card, Form, Container, Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Buffer } from 'buffer'


function TopBar() {
  const [imageSrc, setImageSrc] = useState('')
  const [name, setName] = useState(null)
  const [newMessages, setNewMessages] = useState(false)
  const [newInvites, setNewInvites] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCheckProviderNewMessages= async() => {
      const providerNewMessagesResult = await axios.get('http://localhost:5000/api/endpoints/checkProviderNewMessages')
      setNewMessages(providerNewMessagesResult.data)
  
    }
    fetchCheckProviderNewMessages();
  }, [])

  useEffect(() => {
    const fetchCheckProviderNewInvites= async() => {
      const providerNewInvitesResult = await axios.get('http://localhost:5000/api/endpoints/checkProviderNewInvites')
      setNewInvites(providerNewInvitesResult.data)
  
    }
    fetchCheckProviderNewInvites();
  }, [])


useEffect(() => {
  fetch('http://localhost:5000/api/endpoints/getProfileData').then(
    response => response.json()
  ).then(
    result => setName(JSON.stringify(result.name).replace(/"/g, ""))
  )
}, [])

useEffect(() => {
  const fetchImage = async() => {
    try{
      const response = await axios.get('http://localhost:5000/api/endpoints/getProfilePicture', {
        responseType: 'arraybuffer'
      });
      
      const base64 = Buffer.from(response.data, 'binary').toString('base64')

      const mimeType = response.headers['content-type'];
      setImageSrc(`data:${mimeType};base64,${base64}`)
    }catch(error){
      console.log(error.message)
    }
  }
  fetchImage();


}, [name])



 

 

  return (
    <div>
            {
        newMessages && <div style={{'backgroundColor':'red'}}>new messages new messages new messages</div>
      }
                  {
        newInvites && <div style={{'backgroundColor':'red'}}>new invites new invites new invites</div>
      }

    <a href="/my-reports" style={{'position':'relative', 'left': '120px', 'top':'40px', 'color': 'black'}}>show reports</a>

    <a href="/provider-messages" style={{'position':'relative', 'left': '140px', 'top':'40px', 'color': 'black'}}>messages</a>
    <a href="/provider-invitaions" style={{'position':'relative', 'left': '170px', 'top':'40px', 'color': 'black'}}>my invitaions</a>
    <div style={{'display':'flex'}}>
    <a style={{'cursor':'pointer', 'color':'white'}} href="/provider-profile-4provider">
    <Card style={{'position': 'relative','left': '1100px',  'width': '200px'}}>
      <Card.Title style={{'position': 'relative', 'left': '70px', 'top':'25px'}}>
     {
      name
     }
     
      </Card.Title>
      <img src={imageSrc} style={{'width': '50px', 'height': '50px', 'borderRadius': '90px', 'position':'relative', 'top': '-13px'}}/>
      {
        console.log('imageSRc => '+imageSrc)
      }
    </Card>
    
    </a>
    </div>


  </div>
  )
}

export default TopBar
