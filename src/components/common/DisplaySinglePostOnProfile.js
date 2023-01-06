import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../../lib/api';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box
} from '@mui/material';

export default function PostCard({ postId }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePost(postId))
      .then(({ data }) => setPostData(data))
      .catch(({ message, response }) => console.error(message, response));
  }, [postId]);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/posts/${postData._id}`);
  };

  // console.log(postData);

  return (
    <>
      <Box sx={{ minWidth: 150, maxWidth: 600 }}>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <CardContent>
            <Typography variant='h7' component='div'>
              {postData.topic}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {postData.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={handleClick}>
              Go to Post
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
