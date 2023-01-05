import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import { API } from '../../lib/api';
import '../../styles/CommentThread.scss';

export default function CommentThread({ comments, setIsContentUpdated }) {
  const [testPost, setTestPost] = useState(null);
  const { id } = useParams();

  // useEffect(() => {
  //   API.GET(API.ENDPOINTS.singlePost('63b5ebdc8d0531975aea538a')).then(
  //     ({ data }) => {
  //       setTestPost(data);
  //       console.log(data);
  //     }
  //   );
  // }, []);

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
