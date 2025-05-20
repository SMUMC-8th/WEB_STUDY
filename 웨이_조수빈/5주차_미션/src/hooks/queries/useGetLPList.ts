import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import { PaginationDto } from '../../types/common.ts';

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
  return useQuery({
    queryKey: ["lps"],
    queryFn: () => getLpList({
        cursor,
        search,
        order,
        limit,
    }),
  });
}

export default useGetLpList;