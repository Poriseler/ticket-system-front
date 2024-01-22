import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { useCreateComment } from "./useCreateComment";
import {getWithExpiry} from "../../helpers/localStorageOperations";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #b47e86;
  box-shadow: 1px 1px 6px black;
  color: #fff;
  margin-top: 1rem;
  width: 25rem;
`;

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  background-color: #6d676e;
  color: black;
  width: -webkit-fill-available;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: medium;

  &:focus {
    box-shadow: 0px 0px 13px rgba(216, 216, 216, 0.482);
  }
`;

const Span = styled.span`
  color: black;
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;

  ${Input}:placeholder-shown + & {
    top: 12.5px;
    font-size: 0.9em;
  }

  ${Input}:focus + &,
  ${Input}:valid + & {
    color: bisque;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }
`;

const Submit = styled.button`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  transform: 0.3s ease;
  background-color: bisque;
  width: 30%;
  align-self: center;

  &:hover {
    background-color: #f0bd80;
    transition: all;
    transition-duration: 200ms;
  }
`;

function CommentForm({ ticketId }) {
  const queryClient = useQueryClient();
  // const token = queryClient.getQueryData(["token"]);
  // const token = localStorage.getItem("token");
  const token = getWithExpiry("token");
  const { createComment, isCreating } = useCreateComment();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ticket: ticketId,
      text: commentText,
    };
    createComment({ token, payload });
    queryClient.invalidateQueries(["tickets", ticketId]);
    setCommentText("");
  }
  const [commentText, setCommentText] = useState("");
  return (
    <Form>
      <Label>
        <Input
          type="text"
          required
          placeholder=""
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Span>Comment</Span>
      </Label>
      <Submit disabled={isCreating} onClick={(e) => handleSubmit(e)}>
        Add
      </Submit>
    </Form>
  );
}

export default CommentForm;
