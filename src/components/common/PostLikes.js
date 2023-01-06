import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";

export const PostLikes = () => {
  const [likes, setLikes] = useState(0);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <ThumbUpIcon />
        {`${likes}`}
      </Button>
    </>
  );
};
