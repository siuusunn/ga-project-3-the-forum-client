import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Grid, Paper, styled, Box } from '@mui/material';
import { PostLikes } from './common/PostLikes';
import { SinglePost } from './SinglePost';
import moment from 'moment/moment';

import '../styles/DisplayPosts.scss';

export const DisplayAllPosts = ({ post, selectedId, postingTime }) => {
  const handleClick = () => {
    selectedId(post._id);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E7E7E7',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  return (
    <Box className='DisplayPosts'>
      <Item
        className='DisplayPosts'
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <div className='post-topic'>
          <h3 className='post-topic-name'>{post.topic}</h3>
        </div>
        <div className='postedby-wrapper'>
          <p className='postedby-username'>
            Posted by <b>{post.addedBy?.username}</b>{' '}
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
        <PostLikes storedLikes={post.likes} storedDislikes={post.dislikes} />
      </Item>
    </Box>
  );
};
