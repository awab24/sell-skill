import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function TypeOfWork() {
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [others, setOthers] = useState('')
  
  const handleNextClick = async () => {
    navigate("/letter")
    console.log('categories ===> ' + category)
    await axios.post('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/category', category)
  }

  const handleCategoryClick = (cat) => {
    setCategory((prevCategories) => {
      if (prevCategories.includes(cat)) {
        return prevCategories.filter((c) => c !== cat)
      } else {
        return [...prevCategories, cat]
      }
    })
  }

  const handleAddOther = () => {
    if (others.trim() && !category.includes(others)) {
      setCategory((prevCategories) => [...prevCategories, others])
      setOthers('')
    }
  }

  return (
    <div style={styles.container}>
      <Container>
        <Card style={styles.outerCard}>
          <Card style={styles.innerCard}>
            <Card.Title style={styles.title}>
              <b>Which category are you interested in?</b>
            </Card.Title>
            <div style={styles.buttonsContainer}>
              {['coding', 'AI', 'JavaScript', 'C++', 'Web design', 'Logo design', 'gym', 'cardio', 'motivation', 'self improvement'].map((cat) => (
                <Button
                  key={cat}
                  style={category.includes(cat) ? styles.selectedButton : styles.button}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <Form.Control
              type="text"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
              placeholder="enter other field ..."
              style={styles.input}
            />
            <Button style={styles.button} onClick={handleAddOther}>add other</Button>
            <Button style={styles.nextButton} onClick={handleNextClick}>Next</Button>
          </Card>
        </Card>
      </Container>
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
}

export default TypeOfWork
