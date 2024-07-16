import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProviderId } from '../../reducers/reducers';

function Jobs() {
  const providerId = useSelector((state) => state.allow.providerId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [relatedPosts, setRelatedPosts] = useState([]);
  let clientID;

  dispatch(setProviderId(providerId));

  const handleApply = (id) => {
    axios.post(`https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/insertProviderToClient/${clientID}`, { clientID });
    navigate('/make-proposal');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill-d7865032728d.herokuapp.com/api/endpoints/getPosts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRelatedPosts(result);
        console.log('result ===> ', result)
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter out duplicate posts



  return (
    <Container style={{ backgroundColor: 'blue' }}>
      {relatedPosts.length > 0 ? (
        <ul>
          {relatedPosts.map((post) => {
            clientID = post.clientId;
            return (
              <div key={post._id} style={{ backgroundColor: 'blue' }}>
                <Card style={{ position: 'relative', top: '200px', left: '100px', marginBottom: '40px', backgroundColor: 'black', borderRadius: '10px', borderColor: 'white' }}>
                  {post.title && (
                    <Card.Title style={{ color: '#FF1100', fontSize: '20px', position: 'relative', left: '290px' }}>
                      <b>{post.title}</b>
                    </Card.Title>
                  )}
                  {post.description && (
                    <Card.Body style={{ color: '#FF4400', fontSize: '20px', position: 'relative' }}>
                      <b>{post.description}</b>
                    </Card.Body>
                  )}
                  {post.term && (
                    <Card.Text>
                      <div style={{ color: '#FF7700', position: 'relative', left: '10px' }}>
                        <b>term {' => ' + post.term}</b>
                      </div>
                    </Card.Text>
                  )}
                  <Card.Text>
                    <div style={{ color: '#FFAA00', position: 'relative', left: '10px' }}>
                      <b>budget {' => ' + post.pudget}$</b>
                    </div>
                  </Card.Text>
                  {post.skills && (
                    <Card.Text>
                      <div style={{ color: '#EEEE00', position: 'relative', left: '10px' }}>
                        <b>required skills {' => ' + post.skills}</b>
                      </div>
                    </Card.Text>
                  )}
                  {post.experience && (
                    <Card.Text>
                      <div style={{ color: '#00FF11', position: 'relative', left: '10px' }}>
                        <b>required experience {' => ' + post.experience + ' '} level</b>
                      </div>
                    </Card.Text>
                  )}
                  {post.scope && (
                    <Card.Text>
                      <div style={{ color: '#00DD33', position: 'relative', left: '10px' }}>
                        <b>Estimated scope {' => ' + post.scope}</b>
                      </div>
                    </Card.Text>
                  )}
                  <Button style={{ position: 'relative', width: '300px', left: '756px', borderColor: 'white' }} onClick={() => handleApply(post._id)}>
                    Apply
                  </Button>
                </Card>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No related posts available.</p>
      )}
    </Container>
  );
}

export default Jobs;
