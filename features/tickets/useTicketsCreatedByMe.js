import { useQuery } from "@tanstack/react-query";
import { ticketsCreatedByUser } from "../../services/apiTickets";

export function useTicketsCreatedByMe(token) {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: () => ticketsCreatedByUser(token),
  });
}
