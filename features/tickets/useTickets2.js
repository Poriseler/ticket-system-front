import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const useTickets = (filterParam) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let url;

      filterParam
        ? (url = `http://127.0.0.1:8080/api/tickets?${filterParam}`)
        : (url = "http://127.0.0.1:8080/api/tickets/");
      try {
        const response = await axios.get(url);
        setData(response.data);
        queryClient.setQueryData(["tickets"], data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterParam, data, queryClient]);

  return { data, isLoading, error };
};

export default useTickets;
