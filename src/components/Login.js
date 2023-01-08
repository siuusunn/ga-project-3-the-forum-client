import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import adminPic from '../assets/adminPic.png';
import '../styles/Login.scss';

import { useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  Paper
} from '@mui/material';
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
                Hello again and welcome back. Once again it's me, the very loved
                and respected administrator of this forum. I am very excited to
                see you back on this lovable and respectful platform.
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
              pb: 4,
              pl: 10,
              pr: 10
            }}
            elevation={4}
          >
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
                <EmailOutlined
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
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
          </Paper>
        </Box>
      </Container>
    </>
  );
}
