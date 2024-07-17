import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClientPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseProviderOrClientId = await axios.get('https://sell-skill.com/api/endpoints/providerOrClientId');
                const clientId = responseProviderOrClientId.data;

                const response = await axios.get(`https://sell-skill.com/api/endpoints/showClientPosts/${clientId}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const deletePost = async (postId) => {
        await axios.delete(`https://sell-skill.com/api/endpoints/deletePost/${postId}`);
        setPosts(posts.filter(post => post._id !== postId)); // Update state to remove deleted post
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4" style={{ color: 'blue' }}>Your Posts</h2>
            <Row className="justify-content-center">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={post._id} className="mb-3">
                            <Card className="text-center" style={{ backgroundColor: 'black', color: 'blue' }}>
                                <Card.Body>
                                    <Card.Title style={{ color: 'black' }}>{post.title || 'Untitled Post'}</Card.Title>
                                    <Card.Text>{post.content || 'No content available.'}</Card.Text>
                                    <Button onClick={() => deletePost(post._id)} variant="danger">
                                        <FaTrash /> Delete Post
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center text-white">No posts available.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default ClientPosts;
