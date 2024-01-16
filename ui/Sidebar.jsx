import styled from "styled-components";
import User from "./User";
import Navigation from "./Navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { data: token } = useQuery({
    queryKey: ["token"],
    queryFn: () => queryClient.getQueryData(["token"]),
    initialData: 0,
  });

  return (
    <>
      <StyledSidebar logged={token ? "true" : "false"}>
        {token !== 0 && <User />}
        <Navigation />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
