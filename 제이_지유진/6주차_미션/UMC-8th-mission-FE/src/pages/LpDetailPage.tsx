import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail"; // 오타 수정
import { deleteLike, postLike, TLikes } from "../constants/lps";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { queryClient } from "../main";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { deleteLp } from "../apis/LP";

const LpDetailPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const { userId } = useAuth(); // useAuthContext에서 userId 가져오기
  const { lpId } = useParams<{ lpId: string }>(); // useParams의 타입 명시
  const [like, setLike] = useState(false); // 좋아요 상태 관리
  const {
    data: lp,
    isLoading, // React Query에서 로딩 상태는 isLoading으로 처리
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) }); // lpId를 숫자로 변환

  const hasLiked = (
    likes: TLikes[] | undefined,
    userId: number | undefined | null
  ): boolean => {
    return likes ? likes.some((like) => like.userId === userId) : false;
  };
  const isWriter = (
    authorId: number | undefined,
    userId: number | undefined
  ): boolean => {
    return authorId === userId;
  };

  useEffect(() => {
    setLike(hasLiked(lp?.data.likes, userId));
  }, [lp, userId]);

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => postLike(Number(lpId)),
    onSuccess: () => {
      setLike(true);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] }); // 좋아요 성공 후 쿼리 무효화
    }, // lpId를 숫자로 변환
    onError: (error) => {
      console.error("좋아요 실패:", error);
    },
  });

  const handleLike = () => {
    likeMutate();
  };

  const { mutate: deleteLpMutate } = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      setLike(false);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] }); // 좋아요 성공 후 쿼리 무효화
      navigate("/"); // 삭제 후 홈으로 이동
    }, // lpId를 숫자로 변환
    onError: (error) => {
      console.error("LP 삭제 실패:", error);
    },
  });

  const handledeleteLp = () => {
    deleteLpMutate();
  };

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: () => deleteLike(Number(lpId)),
    onSuccess: () => {
      setLike(false);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] }); // 좋아요 성공 후 쿼리 무효화
    }, // lpId를 숫자로 변환
    onError: (error) => {
      console.error("좋아요 취소 실패:", error);
    },
  });

  const handleUnlike = () => {
    unlikeMutate();
  };

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 상태 처리
  }

  if (isError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // 에러 상태 처리
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-[30px]">
      <h1 className="text-2xl font-bold mb-4">{lp?.data.title}</h1>
      <img
        src={lp?.data.thumbnail || "https://via.placeholder.com/300"}
        alt={lp?.data.title}
        className="w-[300px] max-w-md h-[300px] object-cover mb-4"
      />
      <p className="text-white mb-4">{lp?.data.content}</p>

      <button className="flex items-center gap-2 text-red-400">
        {like ? (
          <FaHeart
            className="text-white-400 cursor-pointer"
            onClick={handleUnlike}
          />
        ) : (
          <FaRegHeart
            className="text-white-400 cursor-pointer"
            onClick={handleLike}
          />
        )}
        <span>{lp?.data.likes?.length || 0}</span>
      </button>
      <button className="text-white" onClick={handledeleteLp}>
        삭제
      </button>
    </div>
  );
};

export default LpDetailPage;
