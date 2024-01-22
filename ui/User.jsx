import styled from "styled-components";
import Button from "./Button";
// import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWithExpiry } from "../helpers/localStorageOperations";
const H3 = styled.h3`
  margin-top: 1rem;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  box-shadow: 1px 1px 6px black;
  padding: 2px 10px;
  background-color: #eaecee67;
  margin-bottom: 10px;
  border-radius: 10px;
`;

function User() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // setEmail(queryClient.getQueryData(["email"]));
    // setEmail(localStorage.getItem("token"));
    setEmail(getWithExpiry("email"));
  }, []);

  function handleClick() {
    // queryClient.setQueryData(["token"], 0);
    // queryClient.invalidateQueries({
    //   queryKey: ["token"],
    // // });
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    navigate("/");
  }
  return (
    <Container>
      <Div>
        <H3>{email}</H3>
      </Div>
      <Button onClick={handleClick}>Logout</Button>
    </Container>
  );
}

export default User;
