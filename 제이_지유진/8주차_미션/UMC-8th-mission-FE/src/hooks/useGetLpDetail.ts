import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key.ts";
import { getLpDetail } from "../apis/LP";
import { RequestLpDto } from "../types/lp";

function useGetLpDatail({ lpId }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
  });
}

export default useGetLpDatail;
