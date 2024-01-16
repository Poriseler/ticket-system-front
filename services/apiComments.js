import axios from "axios";

export async function createComment({ token }, payload) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.post(
    "http://127.0.0.1:8080/api/comments/",
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
    `http://127.0.0.1:8080/api/comments/${commentId}/`,
    payload,
    config
  );

  return data;
}
