import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ data, email }) => {
      queryClient.setQueryData(["token"], data);
      queryClient.setQueryData(["email"], email);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { login, isLoading };
}