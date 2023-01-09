import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostLikes } from './common/PostLikes';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import CommentThread from './common/CommentThread';
import { useAuthenticated } from '../hooks/useAuthenticated';

import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '../styles/SinglePost.scss';

export const DisplayPost = ({ id, setPostsUpdated, userData }) => {
  const [isLoggedIn] = useAuthenticated();
  const [singlePost, setSinglePost] = useState(null);
  const [newCommentFormFields, setNewCommentFormFields] = useState({
    text: ''
  });
  const [isContentUpdated, setIsContentUpdated] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  useEffect(() => {
    setIsPostDeleted(false);
  }, [id]);

  useEffect(() => {
    if (id === null) return;
    if (!isPostDeleted) {
      API.GET(API.ENDPOINTS.singlePost(id))
        .then(({ data }) => {
          setIsPostDeleted(false);
          setSinglePost(data);
        })
        .catch(({ message, response }) => {
          console.error(message, response);
        });
    }
    setIsContentUpdated(false);
  }, [id, isContentUpdated, isPostDeleted]);

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
        setIsPostDeleted(true);
        setIsContentUpdated(true);
        setPostsUpdated(true);
      })
      .catch((err) => console.error(err));
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

  if (isPostDeleted) {
    return (
      <Container className='SinglePost'>
        <div className='inform-deleted-container'>
          <p className='inform-deleted-message'>This post was deleted.</p>
        </div>
      </Container>
    );
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
            <div className='likes-postactions-container'>
              <div className='likes-container-outer'>
                <div className='likes-container-inner'>
                  <PostLikes
                    storedLikes={singlePost?.likes}
                    storedDislikes={singlePost?.dislikes}
                    id={id}
                    setIsContentUpdated={setIsContentUpdated}
                    setPostsUpdated={setPostsUpdated}
                    userData={userData}
                    isButtonDisabled={false}
                  />
                </div>
              </div>
              {isLoggedIn && (
                <div className='post-actions'>
                  {AUTH.isOwner(singlePost?.addedBy._id) && (
                    <Link to={`/posts/${id}/edit`}>
                      <Button
                        size='small'
                        onClick={handleEditPost}
                        variant='contained'
                      >
                        Edit Post
                      </Button>
                    </Link>
                  )}
                  {(AUTH.isOwner(singlePost?.addedBy._id) ||
                    AUTH.getPayload().isAdmin) && (
                    <Button
                      size='small'
                      color='error'
                      onClick={handleDeleteAlertOpen}
                      variant='contained'
                    >
                      Delete Post
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Box>
          <div className='comments-container'>
            <h3>Comments</h3>
            {isLoggedIn && (
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <label htmlFor='comment-text'>Add a comment: </label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form onSubmit={handleNewCommentSubmit}>
                      <TextField
                        type='text'
                        id='comment-text'
                        name='text'
                        multiline
                        rows={4}
                        sx={{ width: '100%' }}
                        value={newCommentFormFields.text}
                        onChange={handleNewCommentChange}
                      ></TextField>
                      <button type='submit'>Submit</button>
                    </form>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}

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
