import styled from "styled-components";
import Heading from "./Heading";

import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: grey;
  border: 1px solid black;
  border-radius: 10px;

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: white;
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 🦺</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
