import { useQuery } from "@tanstack/react-query";
import { fetchTicketDetails } from "../../services/apiTickets";

export function useTicketDetails(ticketId) {
  return useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => fetchTicketDetails(ticketId),
  });
}
