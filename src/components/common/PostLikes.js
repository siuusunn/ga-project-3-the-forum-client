import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Container, Button, Box } from '@mui/material';
import { API } from '../../lib/api';

import '../../styles/PostLikes.scss';

export const PostLikes = ({
  storedLikes,
  storedDislikes,
  setIsContentUpdated,
  id,
  iconSize,
  padding
}) => {
  const [likes, setLikes] = useState(storedLikes);
  const [dislikes, setDislikes] = useState(storedDislikes);

  const [isClicked, setIsClicked] = useState(false);

  const handleLike = async () => {
    API.PUT(
      API.ENDPOINTS.singlePost(id),
      { likes: storedLikes + 1 },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
    setIsContentUpdated(true);
  };

  const handleDislike = async () => {
    API.PUT(
      API.ENDPOINTS.singlePost(id),
      { dislikes: storedDislikes + 1 },
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
    setIsContentUpdated(true);
  };

  return (
    <Box className='PostLikes'>
      <Button
        onClick={handleLike}
        sx={{ pt: padding, pb: padding, pl: padding }}
      >
        <ThumbUpIcon sx={{ height: iconSize }} />
        {`${storedLikes}`}
      </Button>
      <Button
        onClick={handleDislike}
        sx={{ pt: padding, pb: padding, pl: padding }}
      >
        <ThumbDownIcon sx={{ height: iconSize }} />
        {`${storedDislikes}`}
      </Button>
    </Box>
  );
};
