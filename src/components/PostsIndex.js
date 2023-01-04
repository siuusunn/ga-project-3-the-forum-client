import { useEffect, useState } from "react";
import { API } from "../lib/api";
import { Grid, Paper, Box, styled } from "@mui/material";

export default function PostsIndex() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allPosts)
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  console.log({ posts });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "lightYellow",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Box sx={{ width: "40%" }}>
      <Grid container spacing={4} columns={1} sx={{ marginLeft: "12px", marginTop:'20px' }}>
      {posts?.map((post) => (
          <Grid item xs={8} key={post._id} sx={{marginBottom:'5px'}}>
           <Item>{post.text}</Item>
          </Grid>
          
        ))}
       
      </Grid>
    </Box>
  );
}
