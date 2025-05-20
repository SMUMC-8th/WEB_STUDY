import { useInfiniteQuery } from "@tanstack/react-query";
import { TOrder } from "../constants/enum";
import { getComments } from "../apis/LP";
import { TGetCommentsResponse } from "../constants/lps";

type TGetCommentsParams = {
  lpId: number;
  order: TOrder;
  cursor: number;
};

function useGetComments({ lpId, order }: TGetCommentsParams) {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }): Promise<TGetCommentsResponse> =>
      getComments({ lpId, order, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}

export default useGetComments;
