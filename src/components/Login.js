import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

import { Container, Box, TextField, Button, IconButton } from '@mui/material';
import {
  EmailOutlined,
  PasswordOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined
} from '@mui/icons-material';
import { NOTIFY } from '../lib/notifications';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      API.POST(API.ENDPOINTS.login, formFields).then(({ data }) => {
        console.log(data);
        AUTH.setToken(data.token);
        NOTIFY.SUCCESS(data.message);
        navigate('/posts');
        console.log('Successfully logged in');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
    console.log(formFields);
  };

  return (
    <>
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 5
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: 350,
                mb: 2
              }}
            >
              <EmailOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                type='email'
                variant='standard'
                onChange={handleChange}
                required
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <PasswordOutlined
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                id='password'
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                variant='standard'
                onChange={handleChange}
                required
              />

              <IconButton
                aria-label='toggle-password-visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? (
                  <VisibilityOffOutlined />
                ) : (
                  <VisibilityOutlined />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <Button type='submit' variant='contained' sx={{ mt: 5 }}>
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
