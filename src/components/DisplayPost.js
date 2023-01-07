import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PostLikes } from './common/PostLikes';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import CommentThread from './common/CommentThread';

import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

import '../styles/SinglePost.scss';

export const DisplayPost = ({ id, setPostsUpdated }) => {
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(null);
  const [newCommentFormFields, setNewCommentFormFields] = useState({
    text: ''
  });
  const [isContentUpdated, setIsContentUpdated] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    if (id === null) return;
    API.GET(API.ENDPOINTS.singlePost(id))
      .then(({ data }) => {
        setSinglePost(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });

    setIsContentUpdated(false);
    // console.log(isContentUpdated);
  }, [id, isContentUpdated]);

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
        // console.log(data);
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  const deletePost = () => {
    console.log('delete post');
    API.DELETE(API.ENDPOINTS.singlePost(id), API.getHeaders())
      .then(() => {
        setIsContentUpdated(true);
        setPostsUpdated(true);
      })
      .catch((err) => console.error(err));

    // setPostsUpdated(true);
    // navigate('/posts');
  };

  const handleEditPost = () => {
    console.log('edit post');
  };

  const handleDeleteAlertOpen = () => {
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteAlertClose = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleDeleteConfirm = () => {
    deletePost();
    handleDeleteAlertClose();
  };

  const handleDeleteCancel = () => {
    handleDeleteAlertClose();
  };

  const humanDate = new Date(singlePost?.createdAt).toLocaleString();

  if (!singlePost) {
    return <p>Post deleted</p>;
  } else {
    return (
      <>
        <Container className='SinglePost'>
          <Box>
            <h1>{singlePost?.topic}</h1>
            <p>
              Posted by: {singlePost?.addedBy.username} on{' '}
              <i>{`${humanDate}`}</i>
            </p>
            <p>{singlePost?.content}</p>
            <div className='likes-container-outer'>
              <div className='likes-container-inner'>
                <PostLikes
                  storedLikes={singlePost?.likes}
                  storedDislikes={singlePost?.dislikes}
                  id={id}
                  setIsContentUpdated={setIsContentUpdated}
                />
              </div>
            </div>
            <div className='post-actions'>
              <Button size='small' onClick={handleEditPost} variant='contained'>
                Edit Post
              </Button>
              <Button
                size='small'
                color='error'
                onClick={handleDeleteAlertOpen}
                variant='contained'
              >
                Delete Post
              </Button>
            </div>
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

            <CommentThread
              comments={singlePost?.comments}
              setIsContentUpdated={setIsContentUpdated}
            />
          </div>
        </Container>
        <Dialog
          open={isDeleteAlertOpen}
          onClose={handleDeleteAlertClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle color='error' id='alert-dialog-title'>
            {'Delete Post'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete
              {AUTH.isOwner(singlePost?.addedBy._id)
                ? ' your'
                : ` this user's`}{' '}
              post <strong>{singlePost?.topic}</strong>? You can't undo this
              action!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color='error' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};
