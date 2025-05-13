import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";
import { RequestLpDto } from "../../types/lp";

function useGetLpDetail({ lpid }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid],
    queryFn: () => getLpDetail({ lpid }),
    // retry: 1,
    // staleTime: 5 * 60 * 1000, // 5분
    // gcTime: 10 * 60 * 1000, // 10분
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
  });
}

export default useGetLpDetail;
