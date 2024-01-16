import styled from "styled-components";

const StyledButton = styled.button`
  padding: 3px 6px;
  border-radius: 7px;
  border: 1px solid black;
  background-color: #c1bcbc61;
  cursor: pointer;

  &:hover {
    background-color: #46464678;
    transition: all;
    transition-duration: 200ms;
  }
`;

function Button({ children, onClick = undefined, disabled = false }) {
  return (
    <StyledButton
      onClick={() => (onClick ? onClick() : null)}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
