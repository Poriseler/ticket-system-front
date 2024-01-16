import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../services/apiEmployees";

export function useGetEmployees(token) {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(token),
  });
}
