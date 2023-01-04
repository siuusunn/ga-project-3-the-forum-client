import '../../styles/CommentCard.scss';

export default function CommentCard({
  text,
  likes,
  dislikes,
  comments,
  addedBy
}) {
  return (
    <div className='CommentCard'>
      <div className='comment-header'>
        <div className='profile-picture'></div>
        <p>{addedBy}</p>
      </div>
      <div className='comment-main'>
        <div className='comment-content'>
          <p>{text}</p>
          <p>
            Likes: {likes}, Dislikes: {dislikes}
          </p>
        </div>
        {comments?.map((comment) => (
          <CommentCard
            key={comment._id}
            text={comment.text}
            likes={comment.likes}
            dislikes={comment.dislikes}
            comments={comment.comments}
            addedBy={comment.addedBy}
          ></CommentCard>
        ))}
      </div>
    </div>
  );
}
