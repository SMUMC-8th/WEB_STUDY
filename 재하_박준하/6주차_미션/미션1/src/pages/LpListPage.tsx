import { useQuery } from "@tanstack/react-query";
import { fetchLpList } from "../utils/funcFetch";
import Loading from "../components/Loading";
import LpElement from "../components/LpElement";
import { LpListResponse } from "../types/ServerResponseType";
import { useState } from "react";

const LpListPage = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { data, isLoading } = useQuery({
    queryKey: ["lpList", order],
    queryFn: () => fetchLpList(order),
  });

  // 정보를 아직 들고오는 중이라면 Loading
  if (isLoading) return <Loading />;

  return (
    <section className="h-full flex-1 flex flex-col">
      <div className="mt-5 mr-10 flex flex-row justify-end">
        <button
          onClick={() => {
            setOrder("asc");
          }}
          className="p-2 px-3 rounded-l-md bg-white hover:bg-green-500 text-black"
        >
          오래된순
        </button>
        <button
          onClick={() => {
            setOrder("desc");
          }}
          className="p-2 px-3 rounded-r-md border-1 border-solid border-white bg-black hover:bg-green-500 text-white"
        >
          최신순
        </button>
      </div>
      <article className="p-10 w-full h-full grid grid-cols-2 md:grid-cols-5 xl:grid-cols-8 gap-4 overflow-y-auto">
        {data.data.data.map((element: LpListResponse, index: number) => (
          <LpElement key={index} props={element} />
        ))}
      </article>
    </section>
  );
};

export default LpListPage;
