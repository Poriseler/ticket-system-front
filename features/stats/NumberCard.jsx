import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const increase = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

const Card = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid #6d676e;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff6e8;
  box-shadow: 0px 1px 4px black;
`;

const Number = styled.span`
  font-size: 4em;
  font-weight: bold;
  color: #faa916;
  animation: ${increase} 1s ease-in-out;
`;

export default function NumberCard({ number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (value < number) {
        setValue(value + 1);
      } else {
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [value, number]);

  return (
    <Card>
      <Number>{value}</Number>
    </Card>
  );
}
