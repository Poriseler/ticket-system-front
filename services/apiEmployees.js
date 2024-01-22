import axios from "axios";

const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

export async function getEmployees({ token }) {
  const { data } = await axios.get(`http://${host}:${port}/api/employees/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return data;
}
