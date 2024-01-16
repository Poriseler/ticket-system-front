import styled, { css } from "styled-components";

const Headline = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
`;

function Heading({ children, as }) {
  return <Headline as={as}>{children}</Headline>;
}

export default Heading;
