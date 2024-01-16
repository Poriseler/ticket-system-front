import { useSearchParams } from "react-router-dom";
import { useTicketSearch } from "../features/searching/useTicketSearch";
import TicketTile from "../features/tickets/TicketTile";
import styled from "styled-components";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const H1 = styled.h1`
  text-align: center;
  font-weight: 400;
`;

const Span = styled.span`
  font-weight: 600;
`;

const H3 = styled.h3`
  text-align: center;
`;

function SearchResults() {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const ticketTitle = searchParams.get("ticketTitle");
  const { data, isLoading, error } = useTicketSearch(
    ticketId || ticketTitle,
    (ticketId && "ticketId") || (ticketId && "ticketTitle")
  );
  if (isLoading) return <Spinner />;
  if (error) toast.error(`Error: ${error.message}`);

  return (
    <Div>
      <H1>
        Tickets for: <Span>{ticketId || ticketTitle}</Span>
      </H1>
      {data.results.map((ticket) => (
        <TicketTile key={ticket.id} data={ticket} />
      ))}
      {data.results.length === 0 && <H3>No results 😧</H3>}
    </Div>
  );
}

export default SearchResults;
