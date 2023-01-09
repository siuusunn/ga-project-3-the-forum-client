import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import CommentThread from './common/CommentThread';
import { PostLikes } from './common/PostLikes';

import { Container, Box } from '@mui/material';

import '../styles/SinglePost.scss';
import { DisplayPost } from './DisplayPost';

export const SinglePost = () => {
  const { id } = useParams();

  return <DisplayPost id={id}></DisplayPost>;
};
