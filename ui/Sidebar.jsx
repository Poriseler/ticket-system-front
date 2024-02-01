import styled from "styled-components";
import User from "./User";
import Navigation from "./Navigation";
import { getWithExpiry } from "../helpers/localStorageOperations";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.logged === "true" ? "flex-start" : "center"};
  padding-top: 1rem;
  gap: 5rem;
  background-color: #6d676e;
`;

function Sidebar() {
  const token = getWithExpiry("token");
  return (
    <>
      <StyledSidebar logged={token ? "true" : "false"}>
        {token && <User />}
        <Navigation />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
