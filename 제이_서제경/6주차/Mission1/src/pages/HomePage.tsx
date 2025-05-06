import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { ORDER_LABEL, TOrder } from "../constants/enum";

const HomePage = () => {
  const [search, setSearch] = useState("");

  // 정렬 기준 상태 관리 (최신순이 기본값)
  const [order, setOrder] = useState<TOrder>(TOrder.NEWEST);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(50, search, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) return <div className="mt-20">Loading...</div>;
  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 정렬 버튼 */}
      <div className="flex justify-end w-full mb-4">
        <div className="inline-flex rounded-lg overflow-hidden border border-white">
          {Object.values(TOrder).map((value) => (
            <button
              key={value}
              onClick={() => setOrder(value)}
              className={`w-[100px] py-2 text-sm font-semibold transition-colors duration-200
          ${order === value ? "bg-white text-black" : "bg-black text-white"}`}
            >
              {ORDER_LABEL[value]}
            </button>
          ))}
        </div>
      </div>

      {/* LP 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;
