import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { NOTIFY } from '../lib/notifications';

import {
  Container,
  List,
  Button,
  Box,
  Paper,
  TextField,
  IconButton
} from '@mui/material';

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  AccountCircleOutlined,
  CalendarMonthOutlined,
  PermIdentityOutlined
} from '@mui/icons-material';

import DisplaySinglePostOnProfile from './DisplaySinglePostOnProfile';
import ProfilePicture from './common/ProfilePicture';

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: '',
    isAdmin: false,
    email: '',
    password: '',
    cloudinaryImageId: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const [isUpdated, setIsUpdated] = useState(false);

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

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      if (file !== '') {
        const imageData = new FormData();
        imageData.append('file', file);
        imageData.append(
          'upload_preset',
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryResponse = await API.POST(
          API.ENDPOINTS.cloudinary,
          imageData
        );

        const imageId = cloudinaryResponse.data.public_id;

        const apiReqBody = {
          ...formFields,
          cloudinaryImageId: imageId
        };

        await API.PUT(
          API.ENDPOINTS.singleUser(userData?._id),
          apiReqBody,
          API.getHeaders()
        );

        const loginData = await API.POST(API.ENDPOINTS.login, {
          email: formFields.email,
          password: formFields.password
        });

        AUTH.setToken(loginData.data.token);

        NOTIFY.SUCCESS('User profile updated!');
        setIsUpdated(true);
        setIsEditMode(false);
      }

      await API.PUT(
        API.ENDPOINTS.singleUser(userData?._id),
        formFields,
        API.getHeaders()
      );

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password
      });

      AUTH.setToken(loginData.data.token);

      NOTIFY.SUCCESS('User profile updated!');
      setIsUpdated(true);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(id))
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const userPosts = userData?.posts;

  console.log(userData);

  const humanDate = new Date(userData?.createdAt).toLocaleDateString();

  return (
    <>
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3
        }}
      >
        <h1>{userData?.username}'s Profile</h1>
        <Paper
          elevation={6}
          sx={{
            pt: 5,
            pb: 4,
            pl: 10,
            pr: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 5
          }}
        >
          {isEditMode ? (
            <>
              <ProfilePicture
                cloudinaryImageId={userData?.cloudinaryImageId}
                imageWidth={200}
                imageHeight={200}
              />
              <TextField
                fullWidth
                id='username'
                name='username'
                label='Username'
                type='text'
                variant='standard'
                defaultValue={userData.username}
                onChange={handleChange}
                required
                sx={{ mt: 3 }}
              />
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                type='email'
                variant='standard'
                defaultValue={userData.email}
                onChange={handleChange}
                required
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  mb: 1,
                  width: 400
                }}
              >
                <TextField
                  fullWidth
                  id='password'
                  name='password'
                  label='New Password'
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
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  mb: 2,
                  width: 400
                }}
              >
                <TextField
                  fullWidth
                  id='passwordConfirmation'
                  name='passwordConfirmation'
                  label='New Password Confirmation'
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
              <h4>Upload a new profile picture:</h4>
              <TextField
                id='profile-picture'
                name='profile-picture'
                type='file'
                variant='standard'
                onChange={handleFileChange}
                required
                sx={{ mb: 4 }}
              />
            </>
          ) : (
            <>
              <ProfilePicture
                cloudinaryImageId={userData?.cloudinaryImageId}
                imageWidth={200}
                imageHeight={200}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <AccountCircleOutlined sx={{ mr: 1 }} />
                {userData?.username}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CalendarMonthOutlined sx={{ mr: 1 }} />
                {`${humanDate}`}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 5 }}>
                <PermIdentityOutlined sx={{ mr: 1 }} />
                {userData?._id}
              </Box>
            </>
          )}
          {AUTH.isOwner(userData?._id) && (
            <>
              {isEditMode ? (
                <>
                  <Box>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                    <Button onClick={toggleEditMode}>Cancel</Button>
                  </Box>
                </>
              ) : (
                <Button onClick={toggleEditMode}>
                  Edit Profile & Password
                </Button>
              )}
            </>
          )}
        </Paper>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 10
          }}
        >
          <h3>Posts by {userData?.username}</h3>
          <List>
            {userPosts?.length === 0 ? (
              <p>{userData?.username} has not posted anything yet</p>
            ) : (
              userPosts?.map((post) => (
                <DisplaySinglePostOnProfile postId={post} key={post} />
              ))
            )}
          </List>
        </Box>
      </Container>
    </>
  );
}
