import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import { Container, List, Button, Box, Paper, TextField } from '@mui/material';

import {
  FileUploadOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined
} from '@mui/icons-material';

import DisplaySinglePostOnProfile from '../components/common/DisplaySinglePostOnProfile';
import ProfilePicture from './common/ProfilePicture';

export default function Profile() {
  const navigate = useNavigate();
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

  // const handleFileChange = (event) => {
  //   event.preventDefault();
  //   setFile(event.target.files[0]);
  // };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    // const imageData = new FormData();
    // imageData.append('file', file);
    // imageData.append(
    //   'upload_preset',
    //   process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    // );
    try {
      console.log(formFields);
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

      console.log('Logged in!');
      navigate('/');
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
  }, [id]);

  const userPosts = userData?.posts;

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
        <h1>User Profile</h1>
        <Paper
          elevation={6}
          sx={{
            pt: 4,
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
              <TextField
                fullWidth
                id='password'
                name='password'
                label='New Password'
                type='password'
                variant='standard'
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                id='passwordConfirmation'
                name='passwordConfirmation'
                label='New Password Confirmation'
                type='password'
                variant='standard'
                onChange={handleChange}
                required
              />
              {/* <h4>Upload a new profile picture:</h4>
              <TextField
                id='profile-picture'
                name='profile-picture'
                type='file'
                variant='standard'
                onChange={handleFileChange}
                required
              /> */}
            </>
          ) : (
            <>
              <ProfilePicture
                cloudinaryImageId={userData?.cloudinaryImageId}
                imageWidth={200}
                imageHeight={200}
              />
              <p>Username: {userData?.username}</p>
              <p>Joined on: {`${humanDate}`}</p>
              <p>User ID: {userData?._id}</p>
            </>
          )}
        </Paper>
        {AUTH.isOwner(userData?._id) && (
          <>
            {isEditMode ? (
              <>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
                <Button onClick={toggleEditMode}>Cancel</Button>
              </>
            ) : (
              <Button onClick={toggleEditMode}>Edit Profile</Button>
            )}
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
            mb: 10
          }}
        >
          <h3>Posts by user:</h3>
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
