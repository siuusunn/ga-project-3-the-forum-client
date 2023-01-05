import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import CommentThread from './common/CommentThread';

import { Container, Box } from '@mui/material';

export default function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const [newCommentFormFields, setNewCommentFormFields] = useState({
    text: ''
  });

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePost(id))
      .then(({ data }) => {
        setSinglePost(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, [id]);

  const handleNewCommentChange = (event) => {
    setNewCommentFormFields({ [event.target.name]: event.target.value });
  };

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();

    API.POST(
      API.ENDPOINTS.commentsForPost(id),
      newCommentFormFields,
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Container>
        <Box>
          <h1>{singlePost?.topic}</h1>
          <p>
            Posted by: {singlePost?.addedBy.username} on {singlePost?.timestamp}
          </p>
          <p>{singlePost?.content}</p>
          <p>
            Likes: {singlePost?.likes} | Dislikes: {singlePost?.dislikes}
          </p>
        </Box>
        <form onSubmit={handleNewCommentSubmit}>
          <div>
            <label>Add a comment: </label>
            <input
              type='text'
              id='text'
              name='text'
              value={newCommentFormFields.text}
              onChange={handleNewCommentChange}
            ></input>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <CommentThread comments={singlePost?.comments} />
      </Container>
    </>
  );
}
