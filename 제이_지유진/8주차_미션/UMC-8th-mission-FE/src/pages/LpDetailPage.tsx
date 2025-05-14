import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail"; // 오타 수정
import { deleteLike, postLike, TLikes } from "../constants/lps";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";

import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { deleteLp } from "../apis/LP";
import { Pencil, Trash2 } from "lucide-react";
import { queryClient } from "../App";

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
    <div className="flex flex-col items-center justify-center p-4 mt-20 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-[750px] h-[700px] flex flex-col items-center justify-start gap-4">
        {/* 작성자 정보 부분 */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={lp?.data.author.avatar || "https://via.placeholder.com/50"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-[20px]">{lp?.data.author.name}</span>
          </div>
          <div>
            <span className="text-gray-400">
              {new Date(lp?.data.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mb-4">
          <span className="mb-4">{lp?.data.title}</span>
          {isWriter(lp?.data.author.id, userId) && (
            <div className="flex gap-2">
              <Pencil
                className="text-white cursor-pointer"
                onClick={() => navigate(`/lps/${lpId}/edit`)}
              />
              <Trash2
                className="text-white cursor-pointer"
                onClick={handledeleteLp}
              />
            </div>
          )}
        </div>
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
      </div>
    </div>
  );
};

export default LpDetailPage;
