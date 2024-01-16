import { useQuery } from "@tanstack/react-query";
import { searchTickets } from "../../services/apiTickets";

export function useTicketSearch(query, type) {
  return useQuery({
    queryKey: ["ticket", query],
    queryFn: () => searchTickets(query, type),
  });
}
