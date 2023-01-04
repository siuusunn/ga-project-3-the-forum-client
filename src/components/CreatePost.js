import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    text: '',
    timestamp: '',
    likes: 0,
    dislikes: 0
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.allPosts, formFields, API.getHeaders())
      .then(({ data }) => navigate(`/posts/${data._id}`))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Post Content</label>
        <input
          type='text'
          id='title'
          name='text'
          value={formFields.text}
          onChange={handleChange}
        ></input>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
