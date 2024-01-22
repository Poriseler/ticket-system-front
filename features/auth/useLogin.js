import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {setWithExpiry} from "../../helpers/localStorageOperations";

export function useLogin() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ data, email }) => {
      setWithExpiry("token", data);
      setWithExpiry("email", email);
      // localStorage.setItem("token", data);
      // localStorage.setItem("email", email);
      // queryClient.setQueryData(["token"], data);
      // queryClient.setQueryData(["email"], email);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { login, isLoading };
}
