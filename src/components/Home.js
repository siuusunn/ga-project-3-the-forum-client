import {
  Avatar,
  Box,
  Container,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';

import { AdvancedImage } from '@cloudinary/react';
import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Link } from 'react-router-dom';

import adminPic from '../assets/adminPic.png';
import { Cloudinary } from '@cloudinary/url-gen';

export default function Home() {
  const [users, setUsers] = useState(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  useEffect(() => {
    API.GET(API.ENDPOINTS.allUsers)
      .then(({ data }) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

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
            pt: 0,
            pb: 0
          }}
          elevation={6}
        >
          <ImageList
            sx={{
              width: 500,
              height: 370,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              flexWrap: 'wrap',
              pl: 3,
              pr: 3
            }}
          >
            {users?.map((user) => (
              <Link to={`/profile/${user._id}`}>
                <ImageListItem
                  key={user.username}
                  sx={{
                    width: 150,
                    margin: 0,
                    padding: 0
                  }}
                >
                  {
                    <AdvancedImage
                      cldImg={cld
                        .image(user.cloudinaryImageId)
                        .resize(thumbnail().width(200).height(200))}
                    />
                  }
                  <ImageListItemBar title={user.username} />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        </Paper>
      </Container>
    </>
  );
}
