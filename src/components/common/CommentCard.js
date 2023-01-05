import '../../styles/CommentCard.scss';

export default function CommentCard({
  text,
  likes,
  dislikes,
  comments,
  username
}) {
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
            ></CommentCard>
          );
        })}
      </div>
    </div>
  );
}
