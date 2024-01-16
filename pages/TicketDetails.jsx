import { useNavigate, useParams } from "react-router-dom";
import { useTicketDetails } from "../features/tickets/useTicketDetails";
import { useTicketChange } from "../features/tickets/useTicketChange";
import styled from "styled-components";
import { convertDate } from "../helpers/dateOperations";
import Status from "../ui/Status";
import Button from "../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import CommentForm from "../features/comments/CommentForm";
import CommentSection from "../features/comments/CommentSection";
import EditTicketModal from "../features/tickets/EditTicketModal";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b47e86;
  opacity: 0.8;
  padding: 3rem;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  margin-top: 5rem;
  border-radius: 10px;
  box-shadow: 2px 2px 6px black;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  justify-content: ${(props) => props.position};
  width: ${(props) => props.width};
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width};
`;

const Label = styled.p`
  box-shadow: 1px 1px 4px black;
  background-color: grey;
  border-radius: 7px 0px 0px 0px;
  width: ${(props) => props.width};
  padding: 5px 8px;
`;

const Info = styled.p`
  box-shadow: 1px 1px 4px black;
  padding: 5px 8px;
  background-color: white;
  border-radius: 0px 0px 7px 0px;
  border-left: 2px solid black;
  width: ${(props) => props.width};
  flex-grow: 1;
`;

function TicketDetails() {
  const { ticketId } = useParams();
  const { isLoading, error, data } = useTicketDetails(ticketId);
  const { updateTicket, isUpdating } = useTicketChange();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [owner, setOwner] = useState(null);
  const [token, setToken] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOwner(queryClient.getQueryData(["email"]));
    setToken(queryClient.getQueryData(["token"]));
  }, [queryClient]);

  if (isLoading) return <Spinner />;
  if (error) return toast.error(`Error: ${error.message}`);

  const {
    id,
    status,
    title,
    description,
    created_at,
    created_by,
    assigned_to,
    priority,
    updated_at,
    comments,
  } = data;

  const nextStatus =
    status === "OPEN" ? "IN_PROGRESS" : status === "CLOSED" ? "N/A" : "CLOSED";

  function handleChangeModalStatus() {
    setOpenModal(!openModal);
  }

  function handleStatusChange() {
    const payload = {
      status: nextStatus,
    };

    const ticketId = {
      ticketId: id,
    };
    updateTicket({ token, payload, ticketId });
  }

  return (
    <>
      <Container>
        {openModal && (
          <EditTicketModal
            closeModal={handleChangeModalStatus}
            ticketData={data}
          />
        )}
        <Div position={"center"}>
          <Button onClick={() => navigate(-1)}> Back</Button>

          {owner === created_by.email && status !== "CLOSED" && (
            <Button onClick={handleStatusChange} disabled={isUpdating}>
              Change status to
              {status === "OPEN" ? ' "In Progress"' : ' "Closed"'}
            </Button>
          )}
          {owner === created_by.email && status !== "CLOSED" && (
            <Button onClick={handleChangeModalStatus}>Edit</Button>
          )}
        </Div>
        <Div position={"center"}>
          <Status>{status}</Status>

          <Status>{priority}</Status>

          <InfoBox width={"4rem"}>
            <Label>Id</Label>
            <Info>{id}</Info>
          </InfoBox>
        </Div>
        <InfoBox width={"100%"}>
          <Label width={"20%"}>Title</Label>
          <Info width={"70%"}>{title}</Info>
        </InfoBox>
        <InfoBox width={"100%"}>
          <Label width={"20%"}>Description</Label>
          <Info width={"70%"}>{description}</Info>
        </InfoBox>
        <Div position={"space-between"} width={"100%"}>
          <InfoBox width={"50%"}>
            <Label width={"30%"}>Created by</Label>
            <Info width={"70%"}>{created_by.email}</Info>
          </InfoBox>
          <InfoBox width={"50%"}>
            <Label width={"30%"}>Created at</Label>
            <Info width={"70%"}>{convertDate(created_at)}</Info>
          </InfoBox>
        </Div>
        <Div position={"space-between"} width={"100%"}>
          <InfoBox width={"50%"}>
            <Label width={"30%"}>Updated at</Label>
            <Info width={"70%"}>{convertDate(updated_at)}</Info>
          </InfoBox>

          <InfoBox width={"50%"}>
            <Label width={"30%"}>Assigned to</Label>
            <Info width={"70%"}>{assigned_to.email}</Info>
          </InfoBox>
        </Div>
      </Container>
      {token !== 0 && status !== "CLOSED" && <CommentForm ticketId={id} />}
      <CommentSection comments={comments} ticketId={id} />
    </>
  );
}

export default TicketDetails;
