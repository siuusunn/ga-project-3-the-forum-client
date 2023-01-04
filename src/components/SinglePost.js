import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';

import { Container, Box } from '@mui/material';

export default function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePost(id))
      .then(({ data }) => {
        setSinglePost(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id]);

  return (
    <>
      <Container>
        <Box>
          <h1>{singlePost?.topic}</h1>
          <p>
            Posted by: {singlePost?.addedBy} on {singlePost?.timestamp}
          </p>
          <p>{singlePost?.content}</p>
          <p>
            Likes: {singlePost?.likes} | Dislikes: {singlePost?.dislikes}
          </p>
        </Box>
      </Container>
    </>
  );
}
