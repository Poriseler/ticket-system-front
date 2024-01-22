import { XMarkIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useTicketChange } from "./useTicketChange";
// import { useQueryClient } from "@tanstack/react-query";
import { getWithExpiry } from "../../helpers/localStorageOperations";

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
  justify-content: space-between;
  width: 100%;
`;

const Div = styled.div`
  width: 30%;
  align-self: center;
`;

const Label = styled.label`
  width: 25%;
`;

const Input = styled.input`
  width: 18rem;
  border-width: 0.667px;
  border-radius: 3px;
`;

const Textarea = styled.textarea`
  width: 18rem;
`;

function EditTicketForm({ closeModal, ticketData }) {
  const [title, setTitle] = useState(ticketData.title);
  const [description, setDescription] = useState(ticketData.description);
  const [priority, setPriority] = useState(ticketData.priority);
  const { updateTicket, isUpdating } = useTicketChange();
  // const queryClient = useQueryClient();

  function submitChange(e) {
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      priority: priority,
    };

    // const token = queryClient.getQueryData(["token"]);
    // const token = localStorage.getItem('token')
    const token = getWithExpiry("token");
    const ticketId = {
      ticketId: ticketData.id,
    };

    updateTicket({ token, payload, ticketId });
  }

  return (
    <Container>
      <IconContainer>
        <XMarkIcon height={"1.5rem"} onClick={closeModal} />
      </IconContainer>
      <Form onSubmit={submitChange}>
        <Row>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </Row>
        <Row>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </Row>
        <Row>
          <Label>Priority</Label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="URGENT">Urgent</option>
            <option value="MODERATE">Moderate</option>
          </select>
        </Row>
        <Div>
          <Button disabled={isUpdating}>Save changes</Button>
        </Div>
      </Form>
    </Container>
  );
}

export default EditTicketForm;
