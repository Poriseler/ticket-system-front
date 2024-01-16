import styled from "styled-components";
import CommentTile from "./CommentTile";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-bottom: 2rem;
  min-width: 20rem;
`;

function CommentSection({ comments, ticketId }) {
  return (
    <Div>
      {comments?.map((comment) => (
        <CommentTile key={comment.id} comment={comment} ticketId={ticketId} />
      ))}
    </Div>
  );
}

export default CommentSection;
