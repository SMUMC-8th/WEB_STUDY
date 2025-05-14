import { useInfiniteQuery } from "@tanstack/react-query";
import { TOrder } from "../constants/enum";
import getLP from "../apis/LP";
import { TGetLPResponse } from "../constants/lps";

type TGetLPsRequest = {
  order: TOrder;
  cursor: number;
  search: string;
};

function useGetLps({ order, search }: TGetLPsRequest) {
  return useInfiniteQuery({
    queryKey: ["getLPs", order, search],
    queryFn: ({ pageParam = 0 }): Promise<TGetLPResponse> =>
      getLP({ order, cursor: pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
export default useGetLps;
