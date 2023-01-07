import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../lib/api';
import { TextField, Box, Container, Button, Checkbox } from '@mui/material';

import { PostAdd } from '@mui/icons-material';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testText, setTestText] = useState('Some Test Text');
  const [singlePost, setSinglePost] = useState({
    topic: '',
    content: ''
  });
  const [formFields, setFormFields] = useState({
    content: ''
  });
  const [tick, setTick] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePost(id))
      .then(({ data }) => {
        setSinglePost(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    setFormFields({
      topic: singlePost?.topic,
      content: singlePost?.content
    });
  }, [singlePost]);

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleTick = (e) => {
    setTick(!tick);
    console.log(tick);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.PUT(API.ENDPOINTS.singlePost(id), formFields, API.getHeaders())
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
        <h1>Editing Post:</h1>
        <h2>{singlePost?.topic}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              autoFocus={true}
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
                Update Post
              </Button>
            ) : (
              <Button
                type='submit'
                variant='contained'
                endIcon={<PostAdd />}
                disabled
              >
                Update Post
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
