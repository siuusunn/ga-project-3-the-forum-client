import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

import { TextField, Box, Container, Button, Checkbox } from '@mui/material';

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
        mt: 20
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
      </Box>
    </Container>
  );
}
