
/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTickets } from '../../services/apiTickets';

export const usePagination = (filterParams) => {
  const { isLoading, data, hasNextPage, fetchNextPage, fetchPreviousPage, refetch, ...results } = useInfiniteQuery({
    queryKey: ["tickets", { filterParams }],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [_key, { filterParams }] = queryKey;
      
      return fetchTickets({ pageParam, params: filterParams });
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
        
      if (lastPage.next) return lastPageParam + 1;
      return undefined;
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.previous) return lastPageParam -1;
        return undefined;
    },
    initialPageParam: 1,
  });

  return { isLoading, data, hasNextPage,fetchPreviousPage, fetchNextPage, refetch, ...results };
};