import { Avatar, Box, Container, Paper, TextField } from '@mui/material';
import { SearchRounded, TextFieldsOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';

import ProfilePicture from './common/ProfilePicture';

import adminPic from '../assets/adminPic.png';

export default function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers)
      .then(({ data }) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5
      }}
    >
      <h1>The Forum </h1>
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
            Hello, I am the much loved and respected administrator of{' '}
            <b>The Forum</b>. Join us with these amazing users in interesting
            and thought-provoking discussions!
          </p>
        </div>
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 6,
          pb: 6
        }}
        elevation={6}
      >
        {users?.map((user) => (
          <>
            <Link to={`/profile/${user._id}`}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  ml: 2,
                  mr: 2
                }}
              >
                <ProfilePicture
                  cloudinaryImageId={user.cloudinaryImageId}
                  imageHeight={120}
                  imageWidth={120}
                />
                <h5>{user.username}</h5>
              </Box>
            </Link>
          </>
        ))}
      </Paper>
    </Container>
  );
}
