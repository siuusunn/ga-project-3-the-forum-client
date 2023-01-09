import { TextField, Stack, Autocomplete, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { useNavigate, Link } from 'react-router-dom';
import { SearchOutlined } from '@mui/icons-material';

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

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const clearup = () => {
      setIsOpen(false);
      setQuery('');
      setPosts([]);
    };

    return clearup;
  }, []);

  console.log(posts);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <SearchOutlined sx={{ mr: 1 }} />
        <Autocomplete
          id='free-solo-demo'
          freeSolo
          getOptionLabel={(option) => option.topic}
          options={posts?.map((option) => option)}
          onChange={(event: any, option: any) => {
            window.location.href = `/posts/${option._id}`;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search'
              onChange={handleChange}
              sx={{ minWidth: 300 }}
            />
          )}
        />
      </Box>
    </Stack>
  );
}
