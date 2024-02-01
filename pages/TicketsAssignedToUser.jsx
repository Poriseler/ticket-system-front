/* eslint-disable no-unused-vars */
import styled from "styled-components";
import TicketTile from "../features/tickets/TicketTile";
// import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ticketsAssignedToUser } from "../services/apiTickets";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { getWithExpiry } from "../helpers/localStorageOperations";
import { useTicketsAssignedToMe2 } from "../features/tickets/useTicketsAssignedToMe2";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 5rem;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const P = styled.p`
  margin: 0px;
`;

function TicketsAssignedToUser() {
  const token = getWithExpiry("token");
  const [curPage, setCurPage] = useState(1);

  const [count, setCount] = useState(null);

  function handlePrevPage() {
    setCurPage(curPage - 1);
  }
  function handleNextPage() {
    setCurPage(curPage + 1);
  }
  const hasPreviousPage = curPage > 1;
  const { isLoading, data, hasNextPage, fetchNextPage, ...results } =
    useTicketsAssignedToMe2(token);
  const noPages = Math.floor(data?.pages[0]?.count / 10);

  if (isLoading) return <Spinner />;

  return (
    (data?.pages[curPage - 1]?.results?.length === 0 && (
      <h1>Wow, such empty.</h1>
    )) || (
      <>
        <Div>
          {data?.pages[curPage - 1]?.results.map((ticket) => (
            <TicketTile key={ticket.id} data={ticket} />
          ))}
        </Div>
        <Container>
          <Button
            disabled={!hasPreviousPage}
            onClick={() => setCurPage(curPage - 1)}
          >
            Previous
          </Button>
          <P>
            Page {curPage} of {noPages <= 10 ? "1" : noPages}
          </P>
          <Button
            disabled={!(hasNextPage || data?.pages[curPage - 1]?.next)}
            onClick={() => {
              fetchNextPage();
              setCurPage(curPage + 1);
            }}
          >
            Next
          </Button>
        </Container>
      </>
    )
  );
}

export default TicketsAssignedToUser;
