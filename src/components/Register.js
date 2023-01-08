import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';
import adminPic from '../assets/adminPic.png';

import { NOTIFY } from '../lib/notifications';

import {
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Avatar
} from '@mui/material';

import {
  AccountCircleOutlined,
  EmailOutlined,
  PasswordOutlined,
  FileUploadOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined
} from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [file, setFile] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
    console.log(formFields);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );

      const imageId = cloudinaryResponse.data.public_id;

      const apiReqBody = {
        ...formFields,
        cloudinaryImageId: imageId
      };

      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password
      });

      AUTH.setToken(loginData.data.token);

      NOTIFY.SUCCESS(`Welcome to the Forum, ${formFields.username}!`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mb: 4,
              mt: 4
            }}
          >
            <Avatar
              src={adminPic}
              alt='admin-profile-picture'
              sx={{ width: 200, height: 200, mr: 4 }}
            />
            <div class='speech left'>
              <p>
                Hello and welcome to the Forum. I am the very loved and
                respected administrator of this forum, and I am very glad that
                you are joining us in this lovable and respectful platform.
              </p>
            </div>
          </Box>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                mt: 2,
                mb: 2
              }}
            >
              <AccountCircleOutlined
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                id='username'
                name='username'
                label='Username'
                type='text'
                variant='standard'
                onChange={handleChange}
                required
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
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
                justifyContent: 'center',
                mb: 2
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
                type={showPassword ? 'text ' : 'password'}
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
                alignItems: 'flex-end',
                justifyContent: 'center',
                mb: 2
              }}
            >
              <PasswordOutlined
                sx={{ color: 'action.active', mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                id='passwordConfirmation'
                name='passwordConfirmation'
                label='Password Confirmation'
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
                flexDirection: 'column',
                mb: 2
              }}
            >
              <h4>Upload a Profile Picture:</h4>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <FileUploadOutlined
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
                <TextField
                  id='profile-picture'
                  name='profile-picture'
                  type='file'
                  variant='standard'
                  onChange={handleFileChange}
                  required
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <Button type='submit' variant='contained' sx={{ mt: 5 }}>
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
