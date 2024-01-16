import styled from "styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/auth/LoginForm";

const LoginLayout = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h1">Log into Your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
