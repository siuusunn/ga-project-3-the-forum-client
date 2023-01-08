import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import adminPic from '../assets/adminPic.png';

import {
  TextField,
  Box,
  Container,
  Button,
  Checkbox,
  Avatar,
  Paper
} from '@mui/material';

import { PostAdd } from '@mui/icons-material';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    topic: '',
    content: '',
    timestamp: '',
    likes: 0,
    dislikes: 0
  });
  const [tick, setTick] = useState(false);

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleTick = (e) => {
    setTick(!tick);
    console.log(tick);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allPosts, formFields, API.getHeaders())
      .then(({ data }) => navigate(`/posts/${data._id}`))
      .catch((error) => console.error(error));
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 10
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1>Add a New Post</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 4,
            mt: 1
          }}
        >
          <Avatar
            src={adminPic}
            alt='admin-profile-picture'
            sx={{ width: 160, height: 160, mr: 4 }}
          />
          <div class='speech left'>
            <p>
              Hello, it's me, your very loved and respected administrator of
              this forum. Please make sure your post is appropriate and be
              respectful to everyone on this forum.
            </p>
          </div>
        </Box>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 350,
            mb: 2,
            pt: 5,
            pb: 5,
            pl: 15,
            pr: 15
          }}
          elevation={4}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label='Topic'
                placeholder='Your post topic'
                id='topic'
                name='topic'
                value={formFields.topic}
                onChange={handleChange}
                required
                sx={{ width: 500, mb: 2 }}
              />
            </div>
            <div>
              <TextField
                label='Content'
                placeholder='Write your post content here'
                id='content'
                name='content'
                value={formFields.content}
                onChange={handleChange}
                multiline
                required
                sx={{ width: 500 }}
              />
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Checkbox onChange={handleTick} />
              <p>I agree that the Admin does not suck</p>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 1
              }}
            >
              {tick ? (
                <Button type='submit' variant='contained' endIcon={<PostAdd />}>
                  Create Post
                </Button>
              ) : (
                <Button
                  type='submit'
                  variant='contained'
                  endIcon={<PostAdd />}
                  disabled
                >
                  Create Post
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
