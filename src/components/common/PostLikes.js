import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button } from '@mui/material';
import { API } from '../../lib/api';

export const PostLikes = ({
  storedLikes,
  storedDislikes,
  setIsContentUpdated,
  id
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
    <>
      <Button onClick={handleLike}>
        <ThumbUpIcon />
        {`${storedLikes}`}
      </Button>
      <Button onClick={handleDislike}>
        <ThumbDownIcon />
        {`${storedDislikes}`}
      </Button>
    </>
  );
};
