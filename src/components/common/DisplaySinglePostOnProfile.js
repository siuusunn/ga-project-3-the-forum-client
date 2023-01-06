import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../../lib/api';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar
} from '@mui/material';

import { SubjectOutlined } from '@mui/icons-material';

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

  const humanDate = new Date(postData?.createdAt).toLocaleDateString();

  return (
    <>
      <Box sx={{ minWidth: 200, maxWidth: 600, width: 600 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SubjectOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={postData.topic}
            secondary={humanDate}
          ></ListItemText>
          <Button size='small' onClick={handleClick} variant='contained'>
            Go to Post
          </Button>
        </ListItem>
        <Divider variant='inset' />
      </Box>
    </>
  );
}
