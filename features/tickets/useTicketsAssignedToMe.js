import { useQuery } from "@tanstack/react-query";
import { ticketsAssignedToUser } from "../../services/apiTickets";

export function useTicketsAssignedToMe({token, pageParam}) {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: () => ticketsAssignedToUser({token, pageParam}),
  });
}
