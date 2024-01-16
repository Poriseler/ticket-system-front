import axios from "axios";

export async function login({ email, password }) {
  const payload = {
    email: email,
    password: password,
  };

  const { data } = await axios.post(
    "http://127.0.0.1:8080/user/token/",
    payload
  );

  return { data, email };
}

export async function getUserProfile({ token }) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.get("http://127.0.0.1:8080/user/me/", config);
  return data;
}

export async function changeUserProfile({ token }, payload) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.patch(
    "http://127.0.0.1:8080/user/me/",
    payload,
    config
  );
  return data;
}
