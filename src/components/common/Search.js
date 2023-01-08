import { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import { API } from "../../lib/api";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(query)).then(({ data }) => {
      if (query) {
        setIsOpen(true);
        setPosts(data);
      }
    });
  }, [query]);

  useEffect(() => {
    const clearup = () => {
      setIsOpen(false);
      setQuery("");
      setPosts([]);
    };

    return clearup;
  }, []);

  return (
    <Box sx={{ position: "relative" }} className="SEARCH-CONTAINER">
      <TextField value={query} onChange={(e) => setQuery(e.target.value)} />
      {isOpen && (
        <Box
          sx={{ position: "absolute", zIndex: 1, width: "250px" }}
          className="OPTIONS-CONTAINER"
        >
          <Box
            component="ul"
            sx={{ backgroundColor: "#ececec", padding: "10px", width: "100%" }}
          >
            {posts.map((b) => (
              <Box component="li" key={b._id} sx={{ listStyle: "none" }}>
                {/* <Link to={`/posts/${b._id}`}>{b.name}</Link> */}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
