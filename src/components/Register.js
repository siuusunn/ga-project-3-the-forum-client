import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';

import {
  Container,
  Box,
  Input,
  InputLabel,
  TextField,
  FormControl,
  InputAdornment,
  Button
} from '@mui/material';

import {
  AccountCircleOutlined,
  EmailOutlined,
  PasswordOutlined,
  FileUploadOutlined
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

      console.log('Logged in!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <AccountCircleOutlined
              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
            <TextField
              id='username'
              name='username'
              label='Username'
              type='text'
              variant='standard'
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id='email'
              name='email'
              label='Email'
              type='email'
              variant='standard'
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id='password'
              name='password'
              label='Password'
              type='password'
              variant='standard'
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id='passwordConfirmation'
              name='passwordConfirmation'
              label='Password Confirmation'
              type='password'
              variant='standard'
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
          <Button type='submit'>Sign Up</Button>
        </form>
      </Container>
    </>
  );
}
