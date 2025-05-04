import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { TOrderLabel } from "../constants/enum";
import { TOrder } from "../constants/enum";
import Order from "../components/order";
import { CommonResponse } from "../types/common";
import { useInView } from "react-intersection-observer";
import useGetLps from "../hooks/useGetLps";
import LpCard from "../components/LpCard";
import SkeletonCard from "../components/SkeletonCard";

type getLPRequest = {
  order: TOrder;
};
type TLP = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  thumbnail: string | null;
  published: boolean;
};
type TGetLPResponse = CommonResponse<{
  data: TLP[];
}>;
function Home() {
  const [order, setOrder] = useState<keyof typeof TOrderLabel>(
    TOrder.OLDEST_FIRST
  );
  // `getLP` 함수는 서버에서 데이터를 가져오는 비동기 함수입니다.
  // `order`를 매개변수로 받아서, 이를 쿼리 파라미터로 사용하여 API 요청을 보냅니다.
  // 요청이 성공하면 서버에서 반환된 데이터를 그대로 반환합니다.
  // const getLP = async ({ order }: getLPRequest): Promise<TGetLPResponse> => {
  //   const { data } = await axiosInstance.get("v1/lps", {
  //     params: { order },
  //   });
  //   return data;
  // };
  // const { data } = useQuery({
  //   queryKey: ["getLPs", order],
  //   queryFn: () => getLP({ order }),
  // });
  // console.log(data);

  const {
    data: lpData,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetLps({
    order: order,
    cursor: 0,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [isFetching, inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [order]);

  console.log(lpData);
  return (
    <div className="pt-[80px]">
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
