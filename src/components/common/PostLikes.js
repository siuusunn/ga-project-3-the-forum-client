import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Container, Button, Box } from '@mui/material';
import { API } from '../../lib/api';

import '../../styles/PostLikes.scss';

export const PostLikes = ({
  storedLikes,
  storedDislikes,
  isButtonDisabled,
  setIsContentUpdated,
  setPostsUpdated,
  userData,
  id,
  iconSize,
  padding
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = async () => {
    API.PUT(
      API.ENDPOINTS.singlePost(id),
      { likeOrDislike: 'like' },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
        setIsContentUpdated(true);
        setPostsUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDislike = async () => {
    API.PUT(
      API.ENDPOINTS.singlePost(id),
      { likeOrDislike: 'dislike' },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
        setIsContentUpdated(true);
        setPostsUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box className='PostLikes'>
      {isButtonDisabled ? (
        <>
          {userData?.likedPosts?.includes(id) ? (
            <ThumbUpIcon color='success' sx={{ height: iconSize }} />
          ) : (
            <ThumbUpOutlinedIcon sx={{ height: iconSize }} />
          )}
          {`${storedLikes}`}
          {userData?.dislikedPosts?.includes(id) ? (
            <ThumbDownIcon color='error' sx={{ height: iconSize }} />
          ) : (
            <ThumbDownOutlinedIcon sx={{ height: iconSize }} />
          )}
          {`${storedDislikes}`}
        </>
      ) : (
        <>
          <Button
            onClick={handleLike}
            sx={{ pt: padding, pb: padding, pl: padding }}
          >
            {userData?.likedPosts?.includes(id) ? (
              <ThumbUpIcon color='success' sx={{ height: iconSize }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ height: iconSize }} />
            )}
            {`${storedLikes}`}
          </Button>
          <Button
            onClick={handleDislike}
            sx={{ pt: padding, pb: padding, pl: padding }}
          >
            {userData?.dislikedPosts?.includes(id) ? (
              <ThumbDownIcon color='error' sx={{ height: iconSize }} />
            ) : (
              <ThumbDownOutlinedIcon sx={{ height: iconSize }} />
            )}
            {`${storedDislikes}`}
          </Button>
        </>
      )}
    </Box>
  );
};
