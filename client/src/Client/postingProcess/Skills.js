import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOverviewSkills } from '../../reducers/reducers'
import axios from 'axios'

function Skills() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const previousPostData = useSelector((state) => state.allow.overview)
  const [postData, setPostData] = useState(previousPostData)
  const [other, setOther] = useState('')
  const [permission, setPermission] = useState(false)
  
  let token
  const tokenString = localStorage.getItem('clientToken')
  const tokenObject = JSON.parse(tokenString)
  token = tokenObject.token
  if (!token) {
    token = tokenObject
  }
  console.log('token from mainHome => ' + token)
  
  useEffect(() => {
    const fetchPermission = async () => {
      const response = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/verifyClient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data.permission)
      setPermission(response.data.permission)
    }
    fetchPermission()
  }, [])
  
  const navigateSignUpIn = () => {
    navigate('/auth')
  }
  
  const handleNextClick = () => {
    dispatch(setOverviewSkills(postData))
    navigate("/posting-scope")
    console.log(postData)
  }
  
  const handleCategoryClick = (cat) => {
    setPostData((prevData) => ({
      ...prevData,
      skills: prevData.skills.includes(cat) ? prevData.skills.filter(skill => skill !== cat) : [...prevData.skills, cat]
    }))
  }

  const handleAddOther = () => {
    if (other.trim() && !postData.skills.includes(other)) {
      setPostData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, other]
      }))
      setOther('')
    }
  }

  return (
    <div style={styles.container}>
      {permission ? (
        <Container>
          <Card style={styles.outerCard}>
            <Card style={styles.innerCard}>
              <Card.Title style={styles.title}>
                <b>Skills</b>
              </Card.Title>
              <div style={styles.buttonsContainer}>
                {['coding', 'AI', 'JavaScript', 'C++', 'Web design', 'Logo design', 'gym', 'Cardio', 'Motivation', 'self improvement', 'what to do', 'sell your time', 'breaking fear', 'be successful'].map((skill) => (
                  <Button
                    key={skill}
                    style={postData.skills.includes(skill) ? styles.selectedButton : styles.button}
                    onClick={() => handleCategoryClick(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
              <Form.Control
                type="text"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="enter another field ..."
                style={styles.input}
              />
              <Button style={styles.button} onClick={handleAddOther}>add other</Button>
              <Button style={styles.nextButton} onClick={handleNextClick}>Next</Button>
            </Card>
          </Card>
        </Container>
      ) : (
        <div style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Button onClick={navigateSignUpIn}>sign up/in</Button>
          </Card>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f0f8ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCard: {
    backgroundColor: '#000',
    color: '#00f',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    width: '80%',
    margin: '0 auto',
  },
  innerCard: {
    backgroundColor: '#00f',
    color: '#000',
    borderRadius: '20px',
    padding: '20px',
  },
  title: {
    fontSize: '30px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  button: {
    width: '150px',
    margin: '5px',
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
  },
  selectedButton: {
    width: '150px',
    margin: '5px',
    backgroundColor: '#00f',
    borderColor: '#000',
    color: '#000',
  },
  input: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '5px',
  },
  nextButton: {
    display: 'block',
    width: '100%',
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
    borderRadius: '5px',
  },
  permissionContainer: {
    position: 'relative',
    top: '170px',
    left: '270px',
    backgroundColor: 'black',
    height: '200px',
    width: '800px',
  },
  permissionCard: {
    width: '400px',
    position: 'relative',
    top: '50px',
    left: '190px',
  }
}

export default Skills
