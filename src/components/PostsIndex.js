import { useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";

import { NOTIFY } from "../lib/notifications";
import { API } from "../lib/api";
import { DisplayPost } from "./DisplayPost";

import { PostLikes } from "./common/PostLikes";
import { SinglePost } from "./SinglePost";
import { DisplayAllPosts } from "./DisplayAllPosts";

import { Grid, Paper, Box, styled } from "@mui/material";

import "../styles/PostsIndex.scss";

export default function PostsIndex() {
  const [posts, setPosts] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPosts)
      .then(({ data }) => {
        NOTIFY.SUCCESS(`got a post ${data.length} from a user!`);
        setPosts(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        NOTIFY.ERROR(message);
        console.error(message, response);
      });
  }, []);

  console.log({ posts });

  const selectedId = (postId) => {
    setId(postId);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightYellow",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      className="PostsIndex"
      sx={{ width: "100%", display: "flex", flexDirection: "row" }}
    >
      <div className="grid-left">
        {posts?.map((post) => (
          <DisplayAllPosts key={post._id} post={post} selectedId={selectedId} />
        ))}
      </div>
      <Grid
        className="grid-right"
        container
        spacing={4}
        columns={1}
        sx={{ marginLeft: "12px", marginTop: "20px", width: "50%" }}
      >
        {id && <DisplayPost id={id}></DisplayPost>}
      </Grid>
    </Box>
  );
}
