import styled from "styled-components";
import Status from "../../ui/Status";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../helpers/dateOperations";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #b47e86;
  padding-left: 1rem;
  opacity: 90%;
  border-radius: 20px;
  box-shadow: 1px 0.8px 3px black;
  border: 1px solid grey;
`;

const PId = styled.p`
  width: 3rem;
  text-align: center;
  font-weight: bold;
`;

const P = styled.p`
  width: 30%;
  padding: 6px 8px;
  border-radius: 6px;
  box-shadow: 1px 1px 4px black;
  position: relative;
  background: bisque;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #89878754;
    transition: all 0.2s;
  }

  &:hover::after {
    left: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

// const Span = styled.span`
//   font-weight: bold;
// `;

const PDate = styled.p`
  margin: 0px;
  width: fit-content;
  padding: 4px 6px;

  &:first-child {
    border-bottom: 1px solid black;
  }

  ${(props) =>
    props.link === "true" &&
    "&:hover { cursor: grab; background-color: aliceblue; }"}
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 30%; */
`;

function TicketTile({ data }) {
  const navigate = useNavigate();
  const {
    created_at: createdAt,
    updated_at: updatedAt,
    id,
    title,
    status,
  } = data;

  return (
    <Container>
      <Status>{status}</Status>
      <P link="true" onClick={() => navigate(`/tickets/${id}`)}>
        {title}
      </P>
      <Div>
        <PDate>
          {/* <Span>Created at:</Span>  */}
          {convertDate(createdAt)}
        </PDate>
        <PDate>
          {/* <Span>Updated at:</Span>  */}
          {convertDate(updatedAt)}
        </PDate>
      </Div>
      <PId>{id}</PId>
    </Container>
  );
}
P.defaultProps = {
  link: "False",
};
export default TicketTile;
