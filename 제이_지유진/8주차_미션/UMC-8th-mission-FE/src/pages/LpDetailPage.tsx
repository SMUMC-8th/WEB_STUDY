import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/useGetLpDetail";
import { deleteLike, postLike, TLikes } from "../constants/lps";
import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { deleteLp } from "../apis/LP";
import { Pencil, Trash2 } from "lucide-react";
import { queryClient } from "../App";
import useGetComments from "../hooks/useGetComments";
import CommentCard from "../components/CommentCard";
import SkeletonCommentCard from "../components/SkeletonCommentCard";
import Order from "../components/order";
import useThrottle from "../hooks/useThrottle";
import { TOrder, TOrderLabel } from "../constants/enum";
import { useInView } from "react-intersection-observer";

const timeSince = (date: string) => {
  const now = new Date().getTime();
  const then = new Date(date).getTime();
  const seconds = Math.floor((now - then) / 1000);

  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label} 전`;
  }
  return "방금 전";
};

// 좋아요 여부 체크 함수는 컴포넌트 최상단에 선언
const hasLiked = (
  likes: TLikes[] | undefined,
  userId: number | undefined | null
): boolean => {
  return likes ? likes.some((like) => like.userId === userId) : false;
};

const isWriter = (
  authorId: number | undefined,
  userId: number | undefined | null
): boolean => {
  return authorId === userId;
};

const LpDetailPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { lpId } = useParams<{ lpId: string }>();
  const [order, setOrder] = useState<keyof typeof TOrderLabel>(
    TOrder.OLDEST_FIRST
  );
  const [like, setLike] = useState(false);

  const {
    data: lp,
    isLoading,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data: commentData,
    isFetching: isFetchingComment,
    hasNextPage: hasNextPageComment,
    fetchNextPage: fetchNextPageComment,
    refetch: refetchComment,
  } = useGetComments({
    order: order,
    cursor: 0,
    lpId: Number(lpId),
  });

  // useThrottle를 사용할 때 useCallback과 의존성 설정
  const throttledFetchComment = useThrottle(
    useCallback(() => {
      if (!isFetchingComment && hasNextPageComment) fetchNextPageComment();
    }, [isFetchingComment, hasNextPageComment, fetchNextPageComment]),
    3000
  );

  useEffect(() => {
    if (inView) throttledFetchComment();
  }, [inView, throttledFetchComment]);

  useEffect(() => {
    refetchComment();
    // React Query의 refetch는 보통 stable하므로 의존성에 넣지 않아도 됨
  }, [order]);

  // lp와 userId가 바뀔 때마다 좋아요 상태 설정
  useEffect(() => {
    setLike(hasLiked(lp?.data.likes, userId));
  }, [lp, userId]);

  const { mutate: likeMutate } = useMutation({
    mutationFn: () => postLike(Number(lpId)),
    onSuccess: () => {
      setLike(true);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] });
    },
    onError: (error) => console.error("좋아요 실패:", error),
  });

  const handleLike = () => likeMutate();

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: () => deleteLike(Number(lpId)),
    onSuccess: () => {
      setLike(false);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] });
    },
    onError: (error) => console.error("좋아요 취소 실패:", error),
  });

  const handleUnlike = () => unlikeMutate();

  const { mutate: deleteLpMutate } = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      setLike(false);
      queryClient.invalidateQueries({ queryKey: ["getLPDetail"] });
      navigate("/");
    },
    onError: (error) => console.error("LP 삭제 실패:", error),
  });

  const handleDeleteLp = () => deleteLpMutate();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-20 text-white">
      <div className="bg-[#27272A] p-10 rounded-lg shadow-lg w-[750px] flex flex-col items-center justify-start gap-4">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={lp?.data.author.avatar || "https://via.placeholder.com/50"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-[20px]">{lp?.data.author.name}</span>
          </div>
          <p>{timeSince(lp?.data.createdAt)}</p>
        </div>
        <div className="flex justify-between items-center w-full mb-4">
          <span className="text-[15px] mb-4">{lp?.data.title}</span>
          {isWriter(lp?.data.author.id, userId) && (
            <div className="flex gap-2">
              <Pencil
                className="text-white cursor-pointer"
                onClick={() => navigate(`/lps/${lpId}/edit`)}
              />
              <Trash2
                className="text-white cursor-pointer"
                onClick={handleDeleteLp}
              />
            </div>
          )}
        </div>

        <div className="relative w-[400px] h-[400px] flex items-center justify-center bg-[#27272A] shadow-2xl">
          <div
            className="relative w-[300px] h-[300px] rounded-full overflow-hidden animate-spin"
            style={{ animationDuration: "6s" }}
          >
            <img
              src={lp?.data.thumbnail || "https://via.placeholder.com/300"}
              alt={lp?.data.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 w-9 h-9 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-white" />
          </div>
        </div>

        <p className="text-white mb-4">{lp?.data.content}</p>
        <p className="text-white mb-4">
          {lp?.data.tags.map((tag: { id: number; name: string }) => (
            <span
              key={tag.id}
              className="bg-gray-700 text-white rounded-full px-2 py-1 mr-2"
            >
              #{tag.name}
            </span>
          ))}
        </p>

        <button className="flex items-center gap-2 text-red-400">
          {like ? (
            <FaHeart
              className="cursor-pointer"
              onClick={handleUnlike}
              aria-label="좋아요 취소"
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={handleLike}
              aria-label="좋아요"
            />
          )}
          <span>{lp?.data.likes?.length || 0}</span>
        </button>
      </div>

      <div className="mt-10 px-4 w-full max-w-[750px]">
        <h2 className="text-white text-lg font-semibold mb-2">댓글</h2>
        <div className="mt-4 mb-4 mr-4 flex justify-end">
          <Order order={order} setOrder={setOrder} />
        </div>
        <div className="space-y-4">
          {commentData?.pages.map((commentList) =>
            commentList.data.data.map((comment) => (
              <CommentCard {...comment} key={`comment-${comment.id}`} />
            ))
          )}
          {isFetchingComment &&
            Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCommentCard key={`comment-skeleton-${idx}`} />
            ))}
        </div>
        <div ref={ref} className="min-h-[20px]" />
      </div>
    </div>
  );
};

export default LpDetailPage;
