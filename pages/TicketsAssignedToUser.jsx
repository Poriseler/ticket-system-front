import styled from "styled-components";
import TicketTile from "../features/tickets/TicketTile";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ticketsAssignedToUser } from "../services/apiTickets";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 5rem;
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
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["token"]);
  const [isPrev, setIsPrev] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [isNext, setIsNext] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handlePrevPage() {
    setCurPage(curPage - 1);
  }
  function handleNextPage() {
    setCurPage(curPage + 1);
  }
  useEffect(() => {
    async function fetchData() {
      const { results, next, previous, count } = await ticketsAssignedToUser(
        token,
        curPage
      );
      setIsNext(next);
      setIsPrev(previous);
      setCount(count);
      setTickets(results);
    }
    try {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }, [token, curPage]);

  if (isLoading) return <Spinner />;

  return (
    (tickets?.length === 0 && <h1>Wow, such empty.</h1>) || (
      <>
        <Div>
          {tickets?.map((ticket) => (
            <TicketTile key={ticket.id} data={ticket} />
          ))}
        </Div>
        <Container>
          <Button disabled={!isPrev} onClick={handlePrevPage}>
            Previous
          </Button>
          <P>
            Page {curPage} of {count <= 10 ? "1" : `${count / 10}`}
          </P>
          <Button disabled={!isNext} onClick={handleNextPage}>
            Next
          </Button>
        </Container>
      </>
    )
  );
}

export default TicketsAssignedToUser;
