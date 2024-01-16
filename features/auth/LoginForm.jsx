import styled from "styled-components";
import { useState } from "react";
import { useLogin } from "./useLogin";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  width: 70%;
  background-color: #b47e86;
  color: #fff;
  border: 1px solid #333;
  box-shadow: 0px 1px 4px black;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  color: bisque;
`;

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  background-color: #6d676e;
  color: black;
  width: -webkit-fill-available;
  padding: 20px 05px 05px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: medium;

  &:focus {
    box-shadow: 0px 0px 13px rgba(216, 216, 216, 0.482);
  }
`;

const Span = styled.span`
  color: black;
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;

  ${Input}:placeholder-shown + & {
    top: 12.5px;
    font-size: 0.9em;
  }

  ${Input}:focus + &,
  ${Input}:valid + & {
    color: bisque;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }
`;

const Submit = styled.button`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  transform: 0.3s ease;
  background-color: bisque;

  &:hover {
    background-color: #f0bd80;
    transition: all;
    transition-duration: 200ms;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Label>
        <Input
          id="email"
          type="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Span>Email</Span>
      </Label>
      <Label>
        <Input
          id="password"
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Span>Password</Span>
      </Label>
      <Submit disabled={isLoading}>Login</Submit>
    </Form>
  );
}

export default LoginForm;
