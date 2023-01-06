import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Grid, Paper, styled } from '@mui/material';
import { PostLikes } from './common/PostLikes';
import { SinglePost } from './SinglePost';

import '../styles/DisplayPosts.scss';

export const DisplayPosts = ({ post, selectedId }) => {
  const handleClick = () => {
    selectedId(post._id);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightYellow',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  console.log(post);

  return (
    <div className='DisplayPosts'>
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
          <p>
            <strong>{post.topic}</strong>
          </p>
        </div>
        <div className='postedby-wrapper'>
          <p className='postedby-text'>Posted by:</p>
          <p className='postedby-username'>{post.addedBy?.username}</p>
        </div>
        <PostLikes storedLikes={post.likes} storedDislikes={post.dislikes} />
      </Item>
    </div>
  );
};
