import { useEffect, useState } from 'react';

import { NOTIFY } from '../lib/notifications';
import { API } from '../lib/api';
import { DisplayPost } from './DisplayPost';

import { DisplayAllPosts } from './DisplayAllPosts';
import DefaultLandingComponent from './DefaultLandingComponent';

import { Grid, Paper, Box, styled } from '@mui/material';

import '../styles/PostsIndex.scss';

export default function PostsIndex() {
  const [posts, setPosts] = useState(null);
  const [id, setId] = useState(null);
  const [postsUpdated, setPostsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPosts)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch(({ message, response }) => {
        NOTIFY.ERROR(message);
        console.error(message, response);
      });

    setPostsUpdated(false);
  }, [postsUpdated]);

  const selectedId = (postId) => {
    setId(postId);
  };

  return (
    <Box
      className='PostsIndex'
      sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
    >
      <div className='grid-left'>
        {posts?.map((post) => (
          <DisplayAllPosts
            key={post._id}
            post={post}
            selectedId={selectedId}
            postingTime={post.createdAt}
          />
        ))}
      </div>
      <Grid
        className='grid-right'
        container
        spacing={4}
        columns={1}
        sx={{ marginLeft: '12px', marginTop: '20px', width: '50%' }}
      >
        {id ? (
          <DisplayPost id={id} setPostsUpdated={setPostsUpdated} />
        ) : (
          <DefaultLandingComponent />
        )}
      </Grid>
    </Box>
  );
}
