import { useState, useRef } from 'react';
import { API } from '../../lib/api';
import '../../styles/CommentCard.scss';

export default function CommentCard({
  text,
  likes,
  dislikes,
  comments,
  username,
  commentId,
  isDeleted,
  deletedComments,
  setIsContentUpdated,
  parentCommentId
}) {
  const formInput = useRef(null);
  const [newReplyFormFields, setNewReplyFormFields] = useState({
    text: ''
  });

  console.log(comments);

  const handleNewReplyChange = (event) => {
    setNewReplyFormFields({ [event.target.name]: event.target.value });
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    API.POST(
      API.ENDPOINTS.singleComment(commentId),
      newReplyFormFields,
      API.getHeaders()
    )
      .then(({ data }) => {
        console.log(data);
        console.log('Posted comment');
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));

    setNewReplyFormFields({
      text: ''
    });

    handleFocus();
  };

  function handleFocus() {
    formInput.current.blur();
  }

  const handleDeleteComment = () => {
    API.DELETE(API.ENDPOINTS.singleComment(commentId), API.getHeaders())
      .then(({ data }) => {
        console.log(data);
        console.log('Deleted review');
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  if (isDeleted && comments?.length === deletedComments?.length) {
    return;
  } else {
    return (
      <div className='CommentCard'>
        <div className='comment-header'>
          {username ? (
            <div className='profile-picture'></div>
          ) : (
            <div className='profile-picture'></div>
          )}
          <p>{username}</p>
        </div>
        <div className='comment-main'>
          <div className='comment-content'>
            {!isDeleted ? (
              <p>{text}</p>
            ) : (
              <p>
                <em>This comment has been deleted.</em>
              </p>
            )}
            {username && (
              <p>
                Likes: {likes}, Dislikes: {dislikes}
              </p>
            )}
            {username && (
              <div className='comment-actions'>
                <button onClick={handleDeleteComment}>Delete</button>
                <form onSubmit={handleReplySubmit}>
                  <label htmlFor='comment-text'> Reply: </label>
                  <input
                    ref={formInput}
                    type='text'
                    id='comment-text'
                    name='text'
                    value={newReplyFormFields.text}
                    onChange={handleNewReplyChange}
                  ></input>
                  <button type='submit'>Post reply</button>
                </form>
              </div>
            )}
          </div>
          {comments?.map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                text={comment.text}
                likes={comment.likes}
                dislikes={comment.dislikes}
                comments={comment.comments}
                username={comment.addedBy?.username}
                isDeleted={comment.isDeleted}
                deletedComments={comment.deletedComments}
                commentId={comment._id}
                setIsContentUpdated={setIsContentUpdated}
              ></CommentCard>
            );
          })}
        </div>
      </div>
    );
  }
}
