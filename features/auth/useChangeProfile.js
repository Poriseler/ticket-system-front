import { useEffect, useState } from "react";
import { changeUserProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useChangeProfile(token, payload) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function changeProfile() {
      setIsLoading(true);

      try {
        const data = await changeUserProfile(token, payload);
        setData(data);
      } catch (err) {
        toast.error(err.message);
      }

      setIsLoading(false);
    }
    changeProfile();
  }, [token, payload]);

  return { data, isLoading };
}
