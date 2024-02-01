import axios from "axios";

const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

export async function login({ email, password }) {
  const payload = {
    email: email,
    password: password,
  };

  const { data } = await axios.post(
    `http://${host}:${port}/user/token/`,
    payload
  );

  return { data, email };
}

export async function getUserProfile( token ) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.get(`http://${host}:${port}/user/me/`, config);
  return data;
}

export async function changeUserProfile({ token }, payload) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.patch(
    `http://${host}:${port}/user/me/`,
    payload,
    config
  );
  return data;
}
