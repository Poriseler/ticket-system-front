import styled from "styled-components";
import { useCreateTicket } from "../features/tickets/useCreateTicket";
import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { useGetEmployees } from "../features/tickets/useGetEmployees";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { getWithExpiry } from "../helpers/localStorageOperations";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #b47e86;
  color: #fff;
  border: 1px solid #333;
  box-shadow: 0px 1px 4px black;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  color: bisque;
`;
const Message = styled.p`
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
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

  &:hover {
    background-color: #f0bd80;
    transition: all;
    transition-duration: 200ms;
  }
`;

const Select = styled.select`
  background-color: #6d676e;
  color: black;
  width: 100%;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: medium;
`;

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignTo, setAssignTo] = useState(1);
  // const queryClient = useQueryClient();
  // const token = queryClient.getQueryData(["token"]);
  // const token = localStorage.getItem('token')
  const token = getWithExpiry("token");
  const { isLoading, error, data: asignees } = useGetEmployees(token);

  const { createTicket, isCreating } = useCreateTicket();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      priority: priority,
      assigned_to: assignTo,
    };

    createTicket({ token, payload });
  }
  if (isLoading) return <Spinner />;
  if (error) toast.err(error.message);
  return (
    <Form>
      <Title>Create ticket</Title>
      <Message>What happened? Let us know, so we could assist You. </Message>
      <Label>
        <Input
          type="text"
          placeholder=""
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Span>Title</Span>
      </Label>
      <Label>
        <Input
          type="text"
          placeholder=""
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Span>Description</Span>
      </Label>
      <Label>
        <Select
          placeholder=""
          required
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="URGENT">Urgent</option>
          <option value="MODERATE">Moderate</option>
        </Select>
        <Span>Priority</Span>
      </Label>
      <Label>
        <Select
          placeholder=""
          required
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
        >
          {asignees?.map((user) => (
            <option value={user.id + ""} key={user.id}>
              {user.name + " " + user.surname}
            </option>
          ))}
        </Select>
        <Span>Assign to</Span>
      </Label>
      <Submit disabled={isCreating} onClick={(e) => handleSubmit(e)}>
        Submit
      </Submit>
    </Form>
  );
}

export default CreateTicket;
