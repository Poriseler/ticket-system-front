import { useQuery } from "@tanstack/react-query";
import { getStats } from "../../services/apiStats";

export function useGetStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => getStats(),
  });
}
