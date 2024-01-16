import { useQuery } from "@tanstack/react-query";
import { ticketsAssignedToUser } from "../../services/apiTickets";

export function useTicketsAssignedToMe(token, pageNumber) {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: () => ticketsAssignedToUser(token, pageNumber),
  });
}
