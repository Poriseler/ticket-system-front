import axios from "axios";

export async function getEmployees({ token }) {
  const { data } = await axios.get("http://127.0.0.1:8080/api/employees/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return data;
}
