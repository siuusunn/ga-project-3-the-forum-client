import { useEffect, useState } from "react";
import { NOTIFY } from "../lib/notifications";
import { API } from "../lib/api";
import { Grid, Paper, Box, styled } from "@mui/material";
import { PostLikes } from "./common/PostLikes";
import { ReactNotifications } from "react-notifications-component";
import { SinglePost } from "./SinglePost";
import { DisplayAllPosts } from "./DisplayAllPosts";
import { DisplayPost } from "./DisplayPost";

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
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Grid
        container
        spacing={4}
        columns={1}
        sx={{ marginLeft: "12px", marginTop: "20px", width: "50%" }}
      >
        {posts?.map((post) => (
          <DisplayAllPosts post={post} selectedId={selectedId} />
        ))}
      </Grid>
      <Grid
        container
        spacing={4}
        columns={1}
        sx={{ marginLeft: "12px", marginTop: "20px", width: "50%" }}
      >
        <DisplayPost id={id}></DisplayPost>
      </Grid>
    </Box>
  );
}
