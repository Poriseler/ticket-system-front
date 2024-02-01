import { useGetProfile } from "../features/auth/useGetProfile";
import EditProfileForm from "../features/auth/EditProfileForm";
import Spinner from "../ui/Spinner";
import Heading from "../ui/Heading";
import styled from "styled-components";
import { getWithExpiry } from "../helpers/localStorageOperations";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Profile() {
  const token = getWithExpiry("token");
  const { data, isLoading } = useGetProfile(token);
  if (isLoading) return <Spinner />;
  return (
    <Div>
      <Heading as={"h1"}>Something changed?</Heading>
      <EditProfileForm profileData={data} token={token} />
    </Div>
  );
}

export default Profile;
