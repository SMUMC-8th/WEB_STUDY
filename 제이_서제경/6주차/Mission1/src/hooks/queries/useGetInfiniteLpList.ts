import { useInfiniteQuery } from "@tanstack/react-query";
import { getLPList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpListDto } from "../../types/lp";
import { TOrder } from "../../constants/enum";

function useGetInfiniteLpList(limit: number, search: string, order: TOrder) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getLPList({ cursor: pageParam, limit, search, order }),
    queryKey: [QUERY_KEY.lps, search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage: ResponseLpListDto) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
