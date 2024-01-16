import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket as updateTicketApi } from "../../services/apiTickets";
import toast from "react-hot-toast";

export function useTicketChange() {
  const queryClient = useQueryClient();

  const { mutate: updateTicket, isLoading: isUpdating } = useMutation({
    mutationFn: ({ token, payload, ticketId }) =>
      updateTicketApi(token, payload, ticketId),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id + ""] });
      toast.success("Ticket modified.");
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { updateTicket, isUpdating };
}
