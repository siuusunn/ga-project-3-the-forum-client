import { useState, useEffect } from 'react';
import { TextField, Box, Icon } from '@mui/material';
import { API } from '../../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { SearchRounded } from '@mui/icons-material';

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
      setQuery('');
      setPosts([]);
    };

    return clearup;
  }, []);

  const clickPost = () => {};

  return (
    <Box sx={{ position: 'relative' }} className='SEARCH-CONTAINER'>
      <SearchRounded sx={{ marginLeft: '300px', marginTop: '10px' }} />
      <TextField value={query} onChange={(e) => setQuery(e.target.value)} />
      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            width: '500px'
          }}
          className='OPTIONS-CONTAINER'
        >
          <Box
            component='ul'
            sx={{ backgroundColor: '#ececec', padding: '10px', width: '100%' }}
          >
            {posts.map((post) => (
              <Box
                component='li'
                key={post._id}
                sx={{ listStyle: 'none', marginBottom: '10px' }}
                onClick={clickPost}
              >
                <Link to={`/posts/${post._id}`}>{post.topic}</Link>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
