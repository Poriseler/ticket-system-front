import styled from "styled-components";
import { convertDate } from "../../helpers/dateOperations";
import { useQueryClient } from "@tanstack/react-query";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import EditCommentModal from "./EditCommentModal";

const Div = styled.div`
  background-color: #b47e86;
  border-radius: 20px;
  box-shadow: 1px 1px 6px black;
  padding: 5px 20px;
  width: 25rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Span = styled.span`
  max-height: 1rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

function CommentTile({ comment, ticketId }) {
  const queryClient = useQueryClient();
  const loggedUser = queryClient.getQueryData(["email"]);
  const { updated_date, text } = comment;
  const [openModal, setOpenModal] = useState(false);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    setAuthor(comment.author.email);
  }, [comment.author.email]);

  function handleChangeModalStatus() {
    setOpenModal(!openModal);
  }

  return (
    <Div>
      {openModal && (
        <EditCommentModal
          closeModal={handleChangeModalStatus}
          commentData={comment}
          ticketId={ticketId}
        />
      )}
      <Container>
        <p>{author}</p>
        <p>{convertDate(updated_date)}</p>
      </Container>
      <p>
        {loggedUser === author && (
          <Span onClick={handleChangeModalStatus}>
            <PencilIcon height={"1rem"} />
          </Span>
        )}
        {text}
      </p>
    </Div>
  );
}

export default CommentTile;
