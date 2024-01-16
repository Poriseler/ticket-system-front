import { XMarkIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/apiComments";
import toast from "react-hot-toast";

const IconContainer = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25rem;
  background-color: azure;
  border-radius: 20px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 20px;
  gap: 0.8rem;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const Div = styled.div`
  width: 30%;
  align-self: center;
`;

function EditCommentForm({ closeModal, commentData, ticketId }) {
  const [text, setText] = useState(commentData.text);
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const { token } = queryClient.getQueryData(["token"]);

  function submitChange(e) {
    e.preventDefault();

    try {
      setIsUpdating(true);
      const payload = {
        text: text,
      };

      const commentId = commentData.id;
      updateComment(token, payload, commentId);
      setIsUpdating(false);
      toast.success("Comment updated");
      queryClient.invalidateQueries(["tickets", ticketId]);
    } catch (err) {
      toast.err(`Error: ${err}`);
    }
    closeModal();
  }

  return (
    <Container>
      <IconContainer>
        <XMarkIcon height={"1.5rem"} onClick={closeModal} />
      </IconContainer>
      <Form onSubmit={submitChange}>
        <Row>
          <label>Text</label>
          <textarea
            rows={3}
            cols={40}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </Row>
        <Div>
          <Button disabled={isUpdating}>Save changes</Button>
        </Div>
      </Form>
    </Container>
  );
}

export default EditCommentForm;
