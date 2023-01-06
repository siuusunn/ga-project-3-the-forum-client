import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import { Container, List, Button, Box } from '@mui/material';

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
        <ProfilePicture cloudinaryImageId={userData?.cloudinaryImageId} />
        <p>Username: {userData?.username}</p>
        <p>Joined on: {`${humanDate}`}</p>
        <p>User ID: {userData?._id}</p>
        <Button variant='outlined' size='small'>
          Edit Profile
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5
          }}
        >
          <h3>Posts by user:</h3>
          <List>
            {userPosts?.map((post) => (
              <DisplaySinglePostOnProfile postId={post} key={post} />
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}
