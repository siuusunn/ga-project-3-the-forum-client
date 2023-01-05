import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
import CommentThread from './common/CommentThread';

import { Container, Box } from '@mui/material';

import '../styles/SinglePost.scss';

export default function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const [newCommentFormFields, setNewCommentFormFields] = useState({
    text: ''
  });
  const [newCommentSubmitted, setNewCommentSubmitted] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.singlePost(id))
      .then(({ data }) => {
        setSinglePost(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });

    setNewCommentSubmitted(false);
    console.log(newCommentSubmitted);
  }, [id, newCommentSubmitted]);

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

    setNewCommentSubmitted(true);
    console.log(newCommentSubmitted);
  };

  return (
    <>
      <Container className='SinglePost'>
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
        <div className='comments-container'>
          <form onSubmit={handleNewCommentSubmit}>
            <div>
              <h3>Comments</h3>
              <label htmlFor='comment-text'>Add a comment: </label>
              <input
                type='text'
                id='comment-text'
                name='text'
                value={newCommentFormFields.text}
                onChange={handleNewCommentChange}
              ></input>
            </div>
            <button type='submit'>Submit</button>
          </form>
          <CommentThread comments={singlePost?.comments} />
        </div>
      </Container>
    </>
  );
}
