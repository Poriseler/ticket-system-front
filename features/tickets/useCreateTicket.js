import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTicket as createTicketApi } from "../../services/apiTickets";
import toast from "react-hot-toast";

export function useCreateTicket() {
  const navigate = useNavigate();

  const { mutate: createTicket, isLoading: isCreating } = useMutation({
    mutationFn: ({ token, payload }) => createTicketApi(token, payload),
    onSuccess: () => {
      toast.success("Ticket created successfully.");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { createTicket, isCreating };
}
