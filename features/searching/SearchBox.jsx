import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = styled.input`
  padding: 4px 6px;
  border-radius: 30px;
  width: 5rem;
  transition: all;
  transition-duration: 500ms;

  &:focus {
    width: 10rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
function SearchBox() {
  const [query, setQuery] = useState("");
  const [searchKind, setSearchKind] = useState("");
  const navigate = useNavigate();
  function handleSearch() {
    if (searchKind === "ticketId") {
      navigate(`/search?ticketId=${query}`);
      setQuery("");
    }
    if (searchKind === "ticketTitle") {
      navigate(`/search?ticketTitle=${query}`);
      setQuery("");
    }
    return null;
  }

  return (
    <>
      <Container>
        <Input
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <select onChange={(e) => setSearchKind(e.target.value)}>
          <option value="ticketId">Ticket ID</option>
          <option value="ticketTitle">Ticket title</option>
        </select>
        <Button onClick={handleSearch}>Search</Button>
      </Container>
    </>
  );
}

export default SearchBox;
