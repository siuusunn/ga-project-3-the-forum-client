import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

import { Container, List, Button, Box, Paper } from '@mui/material';

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

  console.log(userPosts);

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
          <ProfilePicture
            cloudinaryImageId={userData?.cloudinaryImageId}
            imageWidth={200}
            imageHeight={200}
          />
          <p>Username: {userData?.username}</p>
          <p>Joined on: {`${humanDate}`}</p>
          <p>User ID: {userData?._id}</p>
        </Paper>
        <Button variant='outlined' size='small'>
          Edit Profile
        </Button>
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
