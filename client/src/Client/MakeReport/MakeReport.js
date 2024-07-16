import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function MakeReport() {
    const [providerEmail, setProviderEmail] = useState('')
    const [report , setReport] = useState('')
    const navigate = useNavigate()
    const handleUploadReport = async() => {
      navigate('/client')
        await axios.post('http://localhost:5000/api/endpoints/insertReport', {providerEmail: providerEmail, report: report})

    }
  return (
    <div>
      <Form>
        <Form.Control placeholder='enter the provider email' onChange={(e) => setProviderEmail(e.target.value)}/>
      </Form>
      <Form>
        <Form.Control placeholder='enter the report you wanna make'onChange={(e) => setReport(e.target.value)}/>
      </Form>
      <Button onClick={handleUploadReport}>
        upload
      </Button>
    </div>
  )
}

export default MakeReport
