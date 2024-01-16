import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "../../services/apiTickets";

export function useTickets(params, pageNumber) {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetchTickets(params, pageNumber),
    refetchOnMount: "always",
  });
}
