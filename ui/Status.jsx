import styled from "styled-components";
import { chooseLabel, formatStatus } from "../helpers/stringOperations";

const P = styled.p`
  width: 8rem;
  background-color: ${(props) => props.color};
  border-radius: 11px 0px 11px 0px;
  padding: 6px 0px;
  text-align: center;
  border: 1px solid grey;
  box-shadow: 1px 1px 3px black;
`;

function Status({ children }) {
  const color = chooseLabel(children);

  return <P color={color}>{formatStatus(children)}</P>;
}

export default Status;
