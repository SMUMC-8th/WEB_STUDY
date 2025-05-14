import { queryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { TOrder } from "../constants/enum";
import getLP from "../apis/LP";
import { TGetLPResponse } from "../constants/lps";
type TGetLPsRequest = {
  order: TOrder;
  cursor: number;
};

function useGetLps({ order }: TGetLPsRequest) {
  return useInfiniteQuery({
    queryKey: ["getLPs", order], //order 에 따라 쿼리 키가 달라짐
    queryFn: ({ pageParam = 0 }): Promise<TGetLPResponse> =>
      getLP({ order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    ...queryOptions,
  });
}
export default useGetLps;
