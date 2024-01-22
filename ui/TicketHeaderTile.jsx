import styled from "styled-components";

const Container = styled.div`
  align-self: center;
  width: 40%;
  font-size: 1.3rem;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  background-color: #b47e86;
  padding-left: 1.5rem;
  opacity: 90%;
  border-radius: 20px;
  box-shadow: 1px 0.8px 3px black;
  border: 1px solid grey;
`;

const P = styled.p`
  /* width: 25%; */
`;

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
  width: 30%;
`;

function TicketHeaderTile() {
  return (
    <Container>
      <P>Status</P>
      <P>Title</P>
      <Div>
        <PDate>Created at</PDate>
        <PDate>Updated at</PDate>
      </Div>
      <p>Id</p>
    </Container>
  );
}

export default TicketHeaderTile;
