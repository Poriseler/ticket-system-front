import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useGetProfile(token) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);

      try {
        const data = await getUserProfile(token);
        setData(data);
      } catch (err) {
        toast.error(err);
      }

      setIsLoading(false);
    }
    fetchProfile();
  }, [token]);

  return { data, isLoading };
}
