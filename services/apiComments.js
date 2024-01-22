import axios from "axios";

const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

export async function createComment({ token }, payload) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.post(
    `http://${host}:${port}/api/comments/`,
    payload,
    config
  );

  return data;
}

export async function updateComment(token, payload, commentId) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.patch(
    `http://${host}:${port}/api/comments/${commentId}/`,
    payload,
    config
  );

  return data;
}
