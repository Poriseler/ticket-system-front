// import { useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {getWithExpiry} from "../helpers/localStorageOperations";
import {
  IdentificationIcon,
  HomeIcon,
  TicketIcon,
  ChartBarIcon,
  BriefcaseIcon,
  UserIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  list-style: none;
  padding-left: 0px;
  width: 100%;

  & li {
    border-bottom: 1px solid black;
    margin: 0px 10px;
  }

  & li:last-child {
    border-bottom: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Span = styled.span`
  width: 70%;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 2.3rem;
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    /* padding: 0.2rem 1rem; */
    color: var(--color-grey-600);
    font-weight: 500;

    transition: all 0.3s;
  }

  @media (min-width: 1500px) {
    font-size: 3.5rem;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover {
    background-color: grey;
    border-radius: 10px;
  }
`;

const Li = styled.li`
  padding-left: 10px;
`;

function Navigation() {
  // const queryClient = useQueryClient();
  // const token = queryClient.getQueryData(["token"]);
  // const token = localStorage.getItem("token");
  const token = getWithExpiry("token");

  return (
    <Nav>
      <NavList>
        {!token && (
          <Li>
            <StyledNavLink to="/login">
              <IdentificationIcon /> <Span>Login</Span>
            </StyledNavLink>
          </Li>
        )}
        <Li>
          <StyledNavLink to="/">
            <HomeIcon /> <Span>Home</Span>
          </StyledNavLink>
        </Li>
        {token && (
          <Li>
            <StyledNavLink to="/tickets/assigned-to-me">
              <BriefcaseIcon /> <Span>Assigned to me</Span>
            </StyledNavLink>
          </Li>
        )}
        {token && (
          <Li>
            <StyledNavLink to="/tickets/created-by-me">
              <FlagIcon /> <Span>My tickets</Span>
            </StyledNavLink>
          </Li>
        )}
        {token && (
          <Li>
            <StyledNavLink to="/tickets/create">
              <TicketIcon /> <Span>Create ticket</Span>
            </StyledNavLink>
          </Li>
        )}
        {token && (
          <Li>
            <StyledNavLink to="/profile">
              <UserIcon /> <Span>Profile</Span>
            </StyledNavLink>
          </Li>
        )}
        <Li>
          <StyledNavLink to="/stats">
            <ChartBarIcon /> <Span>Statistics</Span>
          </StyledNavLink>
        </Li>
      </NavList>
    </Nav>
  );
}

export default Navigation;
