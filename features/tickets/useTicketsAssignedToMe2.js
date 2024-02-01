
/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import { ticketsAssignedToUser } from '../../services/apiTickets';

export const useTicketsAssignedToMe2 = (token) => {
  const { isLoading, data, hasNextPage, fetchNextPage, fetchPreviousPage, refetch, ...results } = useInfiniteQuery({
    queryKey: ["tickets"],
    queryFn: ({ pageParam = 1}) => { 

        return ticketsAssignedToUser({ pageParam, token})
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
        
      if (lastPage?.next) return lastPageParam + 1;
      return undefined;
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.previous) return lastPageParam -1;
        return undefined;
    },
    initialPageParam: 1,
  });

  return { isLoading, data, hasNextPage,fetchPreviousPage, fetchNextPage, refetch, ...results };
};