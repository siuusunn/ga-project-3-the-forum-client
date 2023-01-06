import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostLikes from "./common/PostLikes";
import { API } from "../lib/api";

export default function LikeButton() {
  const [likes, setLikes] = useState(100);

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
    <button
      className={`like-button ${isClicked && "liked"}`}
      onClick={handleClick}
    >
      <span className="likes-counter">{`Like | ${likes}`}</span>
    </button>
  );
}
