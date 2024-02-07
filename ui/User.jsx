import styled from "styled-components";
import Button from "./Button";
import { useEffect, useState } from "react";
import { getWithExpiry } from "../helpers/localStorageOperations";
import { useNavigate } from "react-router-dom";
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
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(getWithExpiry("email"));
  }, []);

  function handleClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("storage"));
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
