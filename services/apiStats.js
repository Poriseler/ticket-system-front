import axios from "axios";

export async function getStats() {
  const { data } = await axios.get("http://127.0.0.1:8080/api/metrics");
  return data;
}
