import { useEffect, useState, useRef } from "react";
// import { axiosInstance } from "../apis/axios";
import { TOrderLabel } from "../constants/enum";
import { TOrder } from "../constants/enum";
import Order from "../components/order";
// import { CommonResponse } from "../types/common";
import { useInView } from "react-intersection-observer";
import useGetLps from "../hooks/useGetLps";
import LpCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import { Search } from "lucide-react"; // lucide-icon 돋보기 아이콘

// type getLPRequest = {
//   order: TOrder;
//   search: string;
// };
// type TLP = {
//   id: number;
//   title: string;
//   content: string;
//   authorId: number;
//   createdAt: string;
//   updatedAt: string;
//   thumbnail: string | null;
//   published: boolean;
// };
// type TGetLPResponse = CommonResponse<{
//   data: TLP[];
// }>;
function Home() {
  const [order, setOrder] = useState<keyof typeof TOrderLabel>(
    TOrder.OLDEST_FIRST
  );

  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce(search, 500); // 500ms로 디바운싱 처리

  const {
    data: lpData,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetLps({
    order: order,
    cursor: 0,
    search: debounceValue,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // useEffect(() => {
  //   if (inView) {
  //     if (!isFetching && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   }
  // }, [isFetching, inView, hasNextPage, fetchNextPage]);
  // fetchNextPage를 throttle 처리해서 useRef에 저장
  const throttledFetchRef = useRef<() => void>(null);

  const throttledFetch = useThrottle(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, 3000);

  useEffect(() => {
    throttledFetchRef.current = throttledFetch;
  }, [throttledFetch]);

  useEffect(() => {
    if (inView && throttledFetchRef.current) {
      throttledFetchRef.current();
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [order, debounceValue, refetch]);

  return (
    <div className="pt-[80px]">
      <div className="flex justify-center">
        <div className="relative flex">
          <input
            placeholder="검색어를 입력하세요"
            className="text-white bolder p-4 rounded-sm w-[600px] border-b-2 border-white focus:outline-none focus:ring-0 focus:border-pink-600 px-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
      </div>

      <div className="mt-4 mb-4 mr-4 flex justify-end">
        <Order order={order} setOrder={setOrder}></Order>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 p-4">
        {lpData?.pages.map((lpList) =>
          lpList.data.data.map((lp, idx) => <LpCard {...lp} key={idx} />)
        )}

        {isFetching &&
          Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={`skeleton-${idx}`} />
          ))}
      </div>

      <div ref={ref} className="min-h-[20px]" />
    </div>
  );
}

export default Home;
