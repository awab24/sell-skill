import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux'

function ClientPosts() {
     
    const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseProviderOrClientId = await axios.get('http://localhost:5000/api/endpoints/providerOrClientId');
        const clientId = responseProviderOrClientId.data;
        

        const response = await axios.get(`http://localhost:5000/api/endpoints/showClientPosts/${clientId}`);
      
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);// Ensure dependency array to avoid infinite loop

  const deletePost = async(e) => {
    await axios.delete('http://localhost:5000/api/endpoints/deletePost/'+e)
  }
  return (
    <div>
      {
        posts.length > 0? (posts.map((post) => <Card>{
          post._id}
          <Button onClick={() => deletePost(post._id)}>
          <FaTrash/>Delete post
          </Button>

          </Card>)):(<></>)
      }
    </div>
  )
}

export default ClientPosts
