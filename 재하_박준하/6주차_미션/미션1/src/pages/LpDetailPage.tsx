import { useMutation, useQuery } from "@tanstack/react-query";
import { fecthUser, fetchLpDetail } from "../utils/funcFetch";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import whiteHeart from "../assets/images/whiteHeart.svg";
import pinkHeart from "../assets/images/pinkHeart.svg";
import { umcServerNeedAuth } from "../utils/axiosInfo";
import { queryClient } from "../App";
import { lpDetail, userInfo } from "../types/ServerResponseType";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";

const LpDetailPage = () => {
  const navigate = useNavigate();
  const { LPid } = useParams();
  const { data: userData, isLoading: isLoadingUserData } = useQuery<
    userInfo,
    boolean
  >({
    queryKey: ["userInfo"],
    queryFn: fecthUser,
  });
  const { data: lpDetailData, isLoading: isLoadingLpDetail } = useQuery<
    lpDetail,
    boolean
  >({
    queryKey: ["lpDetail", LPid],
    queryFn: () => fetchLpDetail(String(LPid)),
  });
  const [areYouLike, setAreYouLike] = useState<boolean>(false);

  // 좋아요 상태 초기화
  useEffect(() => {
    // 둘 다 loading 완료 시에 호출
    if (!isLoadingUserData && !isLoadingLpDetail) {
      const isLiked = lpDetailData?.data.likes.some(
        (like: { userId: number }) => like.userId === userData?.data.id
      );
      setAreYouLike(!!isLiked);
    }
  }, [userData, lpDetailData]);

  async function doLikes() {
    const { data } = await umcServerNeedAuth.post(`/v1/lps/${LPid}/likes`);
    return data;
  }

  async function cancleLikes() {
    const { data } = await umcServerNeedAuth.delete(`/v1/lps/${LPid}/likes`);
    return data;
  }

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => doLikes(),
    onSuccess: () => {
      setAreYouLike(true);
      queryClient.invalidateQueries({ queryKey: ["lpDetail", LPid] });
    },
    onError: (error) => {
      console.error("Error liking LP:", error);
      alert("좋아요 누르는데에 실패했습니다");
    },
  });

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: () => cancleLikes(),
    onSuccess: () => {
      setAreYouLike(true);
      queryClient.invalidateQueries({ queryKey: ["lpDetail", LPid] });
    },
    onError: (error) => {
      console.error("Error liking LP:", error);
      alert("좋아요 누르는데에 실패했습니다");
    },
  });

  const handleLike = () => {
    likeMutate();
    // setAreYouLike(!areYouLike);
  };

  const handleUnLike = () => {
    unlikeMutate();
    // setAreYouLike(!areYouLike);
  };

  const { mutate: deleteLPMutate } = useMutation({
    mutationFn: () => deleteLP(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting LP:", error);
      alert("LP 삭제에 실패했습니다.");
    },
  });

  async function deleteLP() {
    const { data } = await umcServerNeedAuth.delete(`/v1/lps/${LPid}`);
    return data;
  }

  const handleDeleteLP = () => {
    deleteLPMutate();
  };

  function diffDates() {
    if (!lpDetailData) return "Loading...";

    const date1 = new Date(lpDetailData?.data.createdAt);
    const date2 = new Date();
    const diffMs = date2.getTime() - date1.getTime(); // 밀리초 차이
    const diffMins = Math.floor(diffMs / (1000 * 60)); // 분(minute) 단위 차이
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60)); // 시(hour) 단위 차이
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 하루(day) 단위 차이

    return diffMins < 60
      ? `${diffMins} mins ag`
      : diffHrs < 24
      ? `${diffHrs} hrs ago`
      : `${diffDays} days ago`;
  }

  // 정보를 아직 들고오는 중이라면 Loading
  if (isLoadingUserData || isLoadingLpDetail) return <Loading />;

  return (
    <article className="flex items-center justify-center w-full h-full">
      <section className="w-full h-full max-w-[700px] max-h-[700px] flex flex-col w-full m-20 rounded-lg bg-zinc-900 text-white">
        <div className="flex flex-row items-center justify-between px-5 mx-10 mt-10">
          <div className="flex flex-row items-center justify-center">
            <img
              src={lpDetailData?.data.author.avatar ?? undefined}
              className="mr-2 size-7"
            />
            <p className="">{lpDetailData?.data.author.name}</p>
          </div>
          <p className="">{diffDates()}</p>
        </div>
        <div className="flex flex-row items-center justify-between px-5 mx-10 overflow-hidden mt-7">
          <p>{lpDetailData?.data.title}</p>
          <div className="flex flex-row items-center justify-center">
            <button>
              <TiPencil className="mr-3 size-5 hover:text-pink-500" />
            </button>
            <button>
              <FaRegTrashAlt className="size-4 hover:text-pink-500" />
            </button>
          </div>
        </div>
        <div className="w-full max-h-[50%] flex justify-center items-center mt-10">
          <div className="relative aspect-square max-w-[312px] shadow-xl/100 bg-zinc-900 rounded-xl">
            <img
              src={lpDetailData?.data.thumbnail}
              className="aspect-square rounded-full p-7 animate-spin animate-spin-slow"
            />
            <div className="absolute top-1/2 left-1/2 w-[20%] h-[20%] rounded-full bg-white -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        <div className="mt-10 mx-10 overflow-hidden line-clamp-2">
          <p className="px-5">{lpDetailData?.data.content}</p>
        </div>
        <div className="flex flex-row justify-center items-center mt-5">
          {lpDetailData?.data.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 mx-1 rounded-full bg-gray-600 text-white text-xs"
            >
              {`# ${tag.name}`}
            </span>
          ))}
        </div>
        <div className="w-full flex flex-row mt-5 justify-center items-center">
          <button
            onClick={() => {
              //  if user did like
              if (areYouLike) handleUnLike();
              //  if user didnt do like
              else handleLike();
            }}
            className="flex justify-center items-center px-1"
          >
            {!areYouLike ? <img src={whiteHeart} /> : <img src={pinkHeart} />}
          </button>
          <p className="w-[15px] px-1 text-white">
            {lpDetailData?.data.likes.length}
          </p>
        </div>
      </section>
    </article>
  );

  // return (
  //   <section className="flex flex-col items-center justify-center w-full h-full">
  //     <article className="max-w-[720px] w-full h-[70vh] m-10 flex flex-col justify-center items-center rounded-lg bg-zinc-900">
  //       <p className="m-5 text-xl text-white mr-30">
  //         {lpDetailData?.data.title}
  //       </p>
  //       <FaRegTrashAlt
  //         onClick={() => {
  //           handleDeleteLP();
  //         }}
  //         color="white"
  //         className="w-[30px] h-[30px] mb-5 hover:bg-zinc-700"
  //       />
  //       <img
  //         src={lpDetailData?.data.thumbnail}
  //         className="aspect-square rounded-full w-[70%] mb-5 object-cover"
  //         alt={lpDetailData?.data.title || "앨범 커버"}
  //       />
  //       <button
  //         onClick={() => {
  //           // if user did like
  //           if (areYouLike) handleUnLike();
  //           // if user didnt do like
  //           else handleLike();
  //         }}
  //         className="mb-3"
  //       >
  //         {!areYouLike ? <img src={whiteHeart} /> : <img src={pinkHeart} />}
  //       </button>
  //       <p className="text-white">{lpDetailData?.data.likes.length}</p>
  //     </article>
  //   </section>
  // );
};

export default LpDetailPage;
