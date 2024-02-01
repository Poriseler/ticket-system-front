import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {setWithExpiry} from "../../helpers/localStorageOperations";

export function useLogin() {
  
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ data, email }) => {
      
      setWithExpiry("token", data.token);
      setWithExpiry("email", email);
      
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  return { login, isLoading };
}
