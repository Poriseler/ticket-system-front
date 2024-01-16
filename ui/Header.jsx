import styled from "styled-components";
import SearchBox from "../features/searching/SearchBox";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: #faa916;
  padding: 1rem 4rem;

  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return (
    <StyledHeader>
      <SearchBox />
      <Logo />
    </StyledHeader>
  );
}

export default Header;
