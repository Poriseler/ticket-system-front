import styled from "styled-components";
import TicketTile from "../features/tickets/TicketTile";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilterBox from "../ui/FilterBox";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import TicketHeaderTile from "../ui/TicketHeaderTile";
import { usePagination } from "../features/tickets/usePagination";
import toast from "react-hot-toast";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
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
  const hasPreviousPage = curPage > 1;
  const { isLoading, data, hasNextPage, isError, fetchNextPage } =
    usePagination(filterParams);
  const noPages = Math.ceil(data?.pages[0]?.count / 10);

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

  function handleOrderTypeChange(value) {
    setOrderType(value);
    searchParams.set("order-by", orderType);
    setSearchParams(searchParams);
    setFilterParams(`order-by=${value}`);
  }

  if (isLoading) return <Spinner />;
  if (isError) toast.error("Something went wrong!");

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
        <TicketHeaderTile />
        {data?.pages[curPage - 1]?.results.map((ticket) => (
          <TicketTile key={ticket.id} data={ticket} />
        )) || <Spinner />}
      </Div>
      <Container>
        <Button
          disabled={!hasPreviousPage}
          onClick={() => setCurPage(curPage - 1)}
        >
          Previous
        </Button>

        <P>
          Page {curPage} of {noPages <= 1 ? "1" : noPages}
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
  );
}

export default Homepage;
