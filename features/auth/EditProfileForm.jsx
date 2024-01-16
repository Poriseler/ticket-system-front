import styled from "styled-components";
import { useState } from "react";
import { changeUserProfile } from "../../services/apiAuth";
import Button from "../../ui/Button";
import { isPwdComplicatedEnough } from "../../helpers/stringOperations";
import toast from "react-hot-toast";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25rem;
  background-color: azure;
  border-radius: 20px;
  padding: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  /* margin-bottom: 20px; */
  gap: 0.8rem;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const Icon = styled.div`
  align-self: center;
  margin-left: 5px;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const PasswordBox = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  box-shadow: 0px 0px 2px black;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
`;

function EditProfileForm({ profileData, token }) {
  const [name, setName] = useState(profileData?.name);
  const [surname, setSurname] = useState(profileData?.surname);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorPwd, setErrorPwd] = useState(null);
  const box = document.getElementById("password-box");

  function arePasswordsValid(password1, password2) {
    if (password1 !== password2) {
      setErrorPwd("❌ Passwords must be the same.");
      setIsUpdating(false);
      return false;
    }
    if (!isPwdComplicatedEnough(password1)) {
      setErrorPwd("❌ Password doesn't meet specified criteria.");
      setIsUpdating(false);
      return false;
    }
    setErrorPwd("");
    return true;
  }

  function submitChange(e) {
    e.preventDefault();
    setIsUpdating(true);
    let payload;
    if (password1 || password2) {
      if (!arePasswordsValid(password1, password2)) return;

      payload = {
        name: name,
        surname: surname,
        password: password1,
      };
    } else {
      payload = {
        name: name,
        surname: surname,
      };
    }
    try {
      changeUserProfile(token, payload);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
    setIsUpdating(false);
  }

  return (
    <Container>
      {errorPwd && <p>{errorPwd}</p>}
      <Form onSubmit={submitChange}>
        <Row>
          <label>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </Row>
        <Row>
          <label>Surname</label>
          <input
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></input>
        </Row>
        <Row>
          <Div>
            <label>Password</label>
            <Icon>
              <QuestionMarkCircleIcon
                height="1rem"
                onMouseEnter={() => (box.style.display = "block")}
                onMouseLeave={() => (box.style.display = "none")}
              />
            </Icon>
          </Div>
          <input
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            type="password"
            placeholder="Optional"
          ></input>
        </Row>
        <Row>
          <label>Confirm new password</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </Row>
        <Button disabled={isUpdating}>Save changes</Button>
      </Form>
      <PasswordBox id="password-box">
        <p>Requirements:</p>
        <ul>
          <li>Min. 6 characters</li>
          <li>1 big letter</li>
          <li>1 small letter</li>
          <li>1 number</li>
        </ul>
      </PasswordBox>
    </Container>
  );
}

export default EditProfileForm;
