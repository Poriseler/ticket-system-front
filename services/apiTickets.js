import axios from "axios";

const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

export async function fetchTicketDetails(ticketId) {
  const { data } = await axios.get(
    `http://${host}:${port}/api/tickets/${ticketId}`
  );

  return data;
}

export async function fetchTickets({params, pageNumber = 1}) {
  let url;
 console.log(params)
  params
    ? (url = `http://${host}:${port}/api/tickets?${params}&page=${pageNumber}`)
    : (url = `http://${host}:${port}/api/tickets?page=${pageNumber}`);
  const { data } = await axios.get(url);
  
  console.log(data)
  return data;
}

export async function ticketsCreatedByUser({ token }, pageNumber = 1) {
  const { data } = await axios.get(
    `http://${host}:${port}/api/tickets/my-tickets?page=${pageNumber}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return data;
}

export async function ticketsAssignedToUser({ token }, pageNumber = 1) {
  const { data } = await axios.get(
    `http://${host}:${port}/api/tickets/assigned-to-me?page=${pageNumber}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return data;
}

export async function searchTickets(query, type) {
  const { data } = await axios.get(
    `http://${host}:${port}/api/tickets?${
      type === "ticketId" ? "ticket-id" : "ticket-title"
    }=${query}`
  );

  return data;
}

export async function createTicket({ token }, payload) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.post(
    `http://${host}:${port}/api/tickets/`,
    payload,
    config
  );

  return data;
}

export async function updateTicket({ token }, payload, { ticketId }) {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const { data } = await axios.patch(
    `http://${host}:${port}/api/tickets/${ticketId}/`,
    payload,
    config
  );

  return data;
}
