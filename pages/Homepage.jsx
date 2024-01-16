import styled from "styled-components";
import TicketTile from "../features/tickets/TicketTile";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterBox from "../ui/FilterBox";
import { fetchTickets } from "../services/apiTickets";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const P = styled.p`
  margin: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 2rem 0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

function Homepage() {
  const [filterParams, setFilterParams] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [orderType, setOrderType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [tickets, setTickets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrev, setIsPrev] = useState(null);
  const [isNext, setIsNext] = useState(null);
  const [count, setCount] = useState(null);

  const orderOptions = [
    {
      label: "Created At Asc",
      value: "created_at-asc",
    },
    {
      label: "Created At Desc",
      value: "created_at-desc",
    },
    {
      label: "Updated At Asc",
      value: "updated_at-asc",
    },
    {
      label: "Updated At Desc",
      value: "updated_at-desc",
    },
    {
      label: "Priority Asc",
      value: "priority-asc",
    },
    {
      label: "Priority Desc",
      value: "priority-desc",
    },
  ];
  function handlePrevPage() {
    setCurPage(curPage - 1);
  }
  function handleNextPage() {
    setCurPage(curPage + 1);
  }

  function handleOrderTypeChange(value) {
    setOrderType(value);
    searchParams.set("order-by", orderType);
    setSearchParams(searchParams);
    setFilterParams(`order-by=${value}`);
  }

  useEffect(() => {
    async function fetchData() {
      const { results, next, previous, count } = await fetchTickets(
        filterParams,
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
      setIsLoading(false);
    }
  }, [filterParams, curPage]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        <P>Filter: </P>
        <FilterBox
          options={orderOptions}
          handleChange={handleOrderTypeChange}
        />
      </Container>

      <Div>
        {tickets?.map((ticket) => (
          <TicketTile key={ticket.id} data={ticket} />
        )) || <Spinner />}
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
  );
}

export default Homepage;
