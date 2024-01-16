import styled from "styled-components";
import TicketTypesChart from "../features/stats/TicketTypesChart";
import NumberCard from "../features/stats/NumberCard";

import { useGetStats } from "../features/stats/useGetStats";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  gap: 20px;
  padding-bottom: 3rem;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

function Statistics() {
  const { data, isLoading } = useGetStats();
  if (isLoading) return <Spinner />;

  const {
    total_tickets: totalTickets,
    avg_closing_time_mins: avgClosingTimeMins,
    tickets_closed: ticketsClosed,
    tickets_in_progress: ticketsInProgress,
    tickets_open: ticketsOpen,
  } = data;

  const ticketTypes = [
    { label: "Open", ticketsNo: ticketsOpen, color: "#ff0000" },
    { label: "Closed", ticketsNo: ticketsClosed, color: "#98ca05" },
    { label: "In progress", ticketsNo: ticketsInProgress, color: "#f08c29" },
  ];

  return (
    <>
      <Div>
        <Container>
          <Heading as={"h2"}>Tickets breakdown</Heading>
          <TicketTypesChart data={ticketTypes} />
        </Container>
        <Container>
          <Heading as={"h2"}>Total number of tickets</Heading>
          <NumberCard number={totalTickets} key="totalTickets" />
        </Container>
        <Container>
          <Heading as={"h2"}>Avarage time of resolving ticket [mins]</Heading>
          <NumberCard number={avgClosingTimeMins} key="AvgTime" />
        </Container>
      </Div>
    </>
  );
}

export default Statistics;
