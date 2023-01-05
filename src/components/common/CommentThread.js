import CommentCard from './CommentCard';
import '../../styles/CommentThread.scss';

export default function CommentThread({ comments, setIsContentUpdated }) {
  return (
    <>
      <div className='CommentThread'>
        {comments?.map((comment) => (
          <CommentCard
            key={comment._id}
            className='CommentCard'
            text={comment.text}
            likes={comment.likes}
            dislikes={comment.dislikes}
            comments={comment.comments}
            username={comment.addedBy.username}
            commentId={comment._id}
            setIsContentUpdated={setIsContentUpdated}
          ></CommentCard>
        ))}
      </div>
    </>
  );
}
