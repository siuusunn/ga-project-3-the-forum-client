import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PostLikes } from "./common/PostLikes";
import { API } from "../lib/api";
import { AUTH } from "../lib/auth";
import CommentThread from "./common/CommentThread";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { NOTIFY } from "../lib/notifications";
import BeatLoader from "react-spinners/ClipLoader";

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
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "../styles/SinglePost.scss";

export const DisplayPost = ({ id, setPostsUpdated, userData }) => {
  const [isLoggedIn] = useAuthenticated();
  const formInput = useRef(null);
  const [singlePost, setSinglePost] = useState(null);
  const [newCommentFormFields, setNewCommentFormFields] = useState({
    text: "",
  });
  const [isContentUpdated, setIsContentUpdated] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [isDisplayingOriginalContent, setIsDisplayingOriginalContent] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsPostDeleted(false);
    setIsDisplayingOriginalContent(false);
  }, [id]);

  useEffect(() => {
    if (id === null) return;
    setIsLoading(true);
    if (!isPostDeleted) {
      API.GET(API.ENDPOINTS.singlePost(id))
        .then(({ data }) => {
          setIsPostDeleted(false);
          setSinglePost(data);
          setIsLoading(false);
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
        NOTIFY.SUCCESS("Your comment was posted!");
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));

    setNewCommentFormFields({ text: "" });
    handleFocus();
  };

  function handleFocus() {
    formInput.current.blur();
  }

  const deletePost = () => {
    console.log("delete post");
    API.DELETE(API.ENDPOINTS.singlePost(id), API.getHeaders())
      .then(() => {
        setIsPostDeleted(true);
        setIsContentUpdated(true);
        setPostsUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  const handleEditPost = () => {
    console.log("edit post");
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

  const toggleOriginalEdited = () => {
    setIsDisplayingOriginalContent(!isDisplayingOriginalContent);
  };

  const humanDate = new Date(singlePost?.createdAt).toLocaleString();

  const spinnerCss = {
    display: "block",
    // margin: "0 auto",
    borderColor: "#36d7b7",
    // marginTop: "50%",
  };

  if (isPostDeleted) {
    return (
      <Container className="SinglePost">
        <div className="inform-deleted-container">
          <p className="inform-deleted-message">This post was deleted.</p>
        </div>
      </Container>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <Container className="SinglePost">
            <div className="spinner-container">
              <BeatLoader color="#36d7b7" size={100} cssOverride={spinnerCss} />
            </div>
          </Container>
        ) : (
          <div>
            <Container className="SinglePost">
              <Box>
                {isDisplayingOriginalContent ? (
                  <h1 className="original-content">
                    {singlePost?.originalTopic}
                  </h1>
                ) : (
                  <h1>{singlePost?.topic}</h1>
                )}
                {singlePost?.isEdited && (
                  <div className="notify-if-edited">
                    <>
                      <InfoOutlinedIcon />
                      {isDisplayingOriginalContent ? (
                        <p>Now viewing the original post</p>
                      ) : (
                        <p>This post has been edited.</p>
                      )}
                      <Button
                        size="small"
                        className="link"
                        onClick={toggleOriginalEdited}
                      >
                        {isDisplayingOriginalContent ? (
                          <p>Show edited</p>
                        ) : (
                          <p>Show original</p>
                        )}
                      </Button>
                    </>
                  </div>
                )}
                <Paper
                  elevation={4}
                  sx={{ padding: 1, margin: "5px 0px 10px 0px" }}
                >
                  {isDisplayingOriginalContent ? (
                    <p className="original-content">
                      {singlePost?.originalContent}
                    </p>
                  ) : (
                    <p>{singlePost?.content}</p>
                  )}
                </Paper>

                <p>
                  Posted by: {singlePost?.addedBy.username} on{" "}
                  <i>{`${humanDate}`}</i>
                </p>

                <div className="likes-postactions-container">
                  <div className="likes-container-outer">
                    <div className="likes-container-inner">
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
                    <div className="post-actions">
                      {AUTH.isOwner(singlePost?.addedBy._id) && (
                        <>
                          {singlePost?.isEdited ? (
                            <Button
                              className="disabled-button"
                              disabled
                              size="small"
                              variant="contained"
                            >
                              Edited
                            </Button>
                          ) : (
                            <Link to={`/posts/${id}/edit`}>
                              <Button
                                size="small"
                                onClick={handleEditPost}
                                variant="contained"
                              >
                                Edit Post
                              </Button>
                            </Link>
                          )}
                        </>
                      )}
                      {(AUTH.isOwner(singlePost?.addedBy._id) ||
                        AUTH.getPayload().isAdmin) && (
                        <Button
                          size="small"
                          color="error"
                          onClick={handleDeleteAlertOpen}
                          variant="contained"
                        >
                          Delete Post
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Box>
              <div className="comments-container">
                <h3>Comments</h3>
                {isLoggedIn && (
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <label htmlFor="comment-text">Add a comment: </label>
                      </AccordionSummary>
                      <AccordionDetails>
                        <form onSubmit={handleNewCommentSubmit}>
                          <TextField
                            ref={formInput}
                            type="text"
                            id="comment-text"
                            name="text"
                            multiline
                            rows={4}
                            sx={{ width: "100%" }}
                            value={newCommentFormFields.text}
                            onChange={handleNewCommentChange}
                          ></TextField>
                          <button type="submit">Submit</button>
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
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle color="error" id="alert-dialog-title">
                {"Delete Post"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete
                  {AUTH.isOwner(singlePost?.addedBy._id)
                    ? " your"
                    : ` this user's`}{" "}
                  post <strong>{singlePost?.topic}</strong>? You can't undo this
                  action!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </>
    );
  }
};
