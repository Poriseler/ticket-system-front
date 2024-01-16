import styled from "styled-components";

const Span = styled.span`
  color: bisque;
`;

const H1 = styled.h1`
  margin: 0;
  letter-spacing: 1.5px;
`;

function Logo() {
  return (
    <H1>
      Tick<Span>Etia</Span>
    </H1>
  );
}

export default Logo;
