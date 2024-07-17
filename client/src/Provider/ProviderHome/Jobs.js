import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProviderId } from '../../reducers/reducers';
import styled from 'styled-components';

function Jobs() {
  const providerId = useSelector((state) => state.allow.providerId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [relatedPosts, setRelatedPosts] = useState([]);
  let clientID;

  dispatch(setProviderId(providerId));

  const handleApply = (id) => {
    axios.post(`https://sell-skill.com/api/endpoints/insertProviderToClient/${clientID}`, { clientID });
    navigate('/make-proposal');
  };
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://sell-skill.com/api/endpoints/getPosts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRelatedPosts(result);
        console.log('result ===> ', result);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <StyledContainer>
      {relatedPosts.length > 0 ? (
        <ul className="list-unstyled">
          {relatedPosts.map((post) => {
            clientID = post.clientId;
            return (
              <StyledCard key={post._id}>
                {post.title && (
                  <Card.Title className="text-center text-danger mb-3">
                    <b>{post.title}</b>
                  </Card.Title>
                )}
                {post.description && (
                  <Card.Body className="text-warning">
                    <b>{post.description}</b>
                  </Card.Body>
                )}
                {post.term && (
                  <Card.Text className="text-info">
                    <b>Term: {post.term}</b>
                  </Card.Text>
                )}
                <Card.Text className="text-info">
                  <b>Budget: {post.budget}$</b>
                </Card.Text>
                {post.skills && (
                  <Card.Text className="text-info">
                    <b>Required Skills: {post.skills}</b>
                  </Card.Text>
                )}
                {post.experience && (
                  <Card.Text className="text-success">
                    <b>Required Experience: {post.experience} level</b>
                  </Card.Text>
                )}
                {post.scope && (
                  <Card.Text className="text-primary">
                    <b>Estimated Scope: {post.scope}</b>
                  </Card.Text>
                )}
                <Button variant="outline-light" className="mt-3" onClick={() => handleApply(post._id)}>
                  Apply
                </Button>
              </StyledCard>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-light">No related posts available.</p>
      )}
    </StyledContainer>
  );
}

export default Jobs;

const StyledContainer = styled(Container)`
  background-color: blue;
  padding: 20px;
  min-height: 100vh;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  background-color: black;
  border-radius: 10px;
  border: 1px solid white;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .text-info {
    color: #ff7700 !important;
  }

  .text-warning {
    color: #ff4400 !important;
  }

  .text-success {
    color: #00ff11 !important;
  }

  .text-primary {
    color: #00dd33 !important;
  }

  .text-danger {
    color: #ff1100 !important;
  }

  .text-center {
    text-align: center;
  }

  .mb-3 {
    margin-bottom: 1rem !important;
  }

  .mt-3 {
    margin-top: 1rem !important;
  }

  .text-light {
    color: white !important;
  }
`;
