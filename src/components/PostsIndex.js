import { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function PostsIndex() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        API.GET(API.ENDPOINTS.allPosts)
          .then(({ data }) => {
            setPosts(data);
          })
          .catch(({ message, response }) => {
            console.error(message, response);
          });
      }, []);

      console.log({ posts });
      return <p>this is our discussion board</p>
    
  

}