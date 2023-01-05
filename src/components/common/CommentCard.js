import { useState } from 'react';
import { API } from '../../lib/api';
import '../../styles/CommentCard.scss';

export default function CommentCard({
  text,
  likes,
  dislikes,
  comments,
  username,
  commentId,
  setIsContentUpdated
}) {
  const [newReplyFormFields, setNewReplyFormFields] = useState({
    text: ''
  });

  const handleNewReplyChange = (event) => {
    setNewReplyFormFields({ [event.target.name]: event.target.value });
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    API.POST(API.ENDPOINTS.singleComment(commentId), newReplyFormFields, API.getHeaders())
      .then(({ data }) => {
        console.log(data);
        console.log('Posted comment');
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteComment = () => {
    API.DELETE(API.ENDPOINTS.singleComment(commentId), API.getHeaders())
      .then(({ data }) => {
        console.log(data);
        console.log('Deleted review');
        setIsContentUpdated(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='CommentCard'>
      <div className='comment-header'>
        <div className='profile-picture'></div>
        <p>{username}</p>
      </div>
      <div className='comment-main'>
        <div className='comment-content'>
          <p>{text}</p>
          <p>
            Likes: {likes}, Dislikes: {dislikes}
          </p>
          <button onClick={handleDeleteComment}>Delete</button>
          <form onSubmit={handleReplySubmit}>
            <label htmlFor='comment-text'> Reply: </label>
            <input
              type='text'
              id='comment-text'
              name='text'
              value={newReplyFormFields.text}
              onChange={handleNewReplyChange}
            ></input>
            <button type='submit'>Post reply</button>
          </form>
        </div>
        {comments?.map((comment) => {
          return (
            <CommentCard
              key={comment._id}
              text={comment.text}
              likes={comment.likes}
              dislikes={comment.dislikes}
              comments={comment.comments}
              username={comment.addedBy.username}
              setIsContentUpdated={setIsContentUpdated}
            ></CommentCard>
          );
        })}
      </div>
    </div>
  );
}
