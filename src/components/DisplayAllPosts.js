import { useEffect, useState } from "react";
import { API } from "../lib/api";
import { Grid, Paper, Box, styled } from "@mui/material";
import { PostLikes } from "./common/PostLikes";
import { SinglePost } from "./SinglePost";

export const DisplayAllPosts = ({ post, selectedId }) => {
  const handleClick = () => {
    selectedId(post._id);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightYellow",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Grid item xs={4} key={post._id} sx={{}}>
      <Item onClick={handleClick}>{post.topic}</Item>
      <PostLikes></PostLikes>
    </Grid>
  );
};
