import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  min-width: 5rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: red;
`;

function VerticalFormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default VerticalFormRow;
