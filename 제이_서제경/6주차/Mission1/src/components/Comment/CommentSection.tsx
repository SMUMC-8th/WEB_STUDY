// [CommentSection.tsx]
// LP Detail 페이지에서 사용되는 댓글 컴포넌트
// 댓글 목록을 서버에서 불러오고, 무한 스크롤 및 최신순/오래된순 정렬 기능 제공
// 댓글 조회 + 작성 담당

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Comment } from "../../types/comment";
import { ORDER_LABEL, TOrder } from "../../constants/enum";
import CommentSkeletonList from "./CommentSkeletonList";
import { getComments, postComment } from "../../apis/comment";

function CommentSection({ lpId }: { lpId: string }) {
  // 정렬 기준 (최신순/오래된순)
  const [order, setOrder] = useState<TOrder>(TOrder.NEWEST);

  //댓글 입력 상태
  const [commentInput, setCommentInput] = useState("");
  const queryClient = useQueryClient(); // 캐시 갱신용

  // 댓글 작성 요청
  const { mutate: createComment, isPending } = useMutation({
    mutationFn: (content: string) => postComment({ lpId, content }),
    onSuccess: () => {
      setCommentInput(""); // 입력창 초기화
      queryClient.invalidateQueries({ queryKey: ["comments", lpId, order] }); // 캐시 무효화 -> 목록 새로고침???
    },
  });

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    createComment(commentInput.trim()); // 댓글 등록 요청
  };

  // 댓글 삭제 요청

  // useInfiniteQuery로 댓글 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["comments", lpId, order], // 쿼리 키는 lpId와 정렬 기준이 변경될 때마다 새로 요청
      queryFn: (
        { pageParam = 1 } // 서버 요청 함수 (댓글 목록 조회)
      ) => getComments({ lpId, page: pageParam, order }),
      getNextPageParam: (
        lastPage // 다음 페이지 존재 여부 판단
      ) => (lastPage.data.hasNext ? lastPage.data.nextCursor : undefined),
      initialPageParam: 1, // 초기 페이지 번호
    });

  if (isLoading) return <CommentSkeletonList count={5} />; // 로딩 중 스켈레톤 UI (5개 스켈레톤 보여줄거임)
  if (isError) return <p>댓글을 불러오는 데 실패했습니다.</p>; // 에러 발생 시 메시지

  return (
    <div className="container mx-auto px-4 py-6 pt-16">
      {/* 정렬 버튼 */}
      <div className="flex justify-start w-full mb-4">
        <div className="inline-flex rounded-lg overflow-hidden border border-white">
          {Object.values(TOrder).map((value) => (
            <button
              key={value}
              onClick={() => setOrder(value)}
              className={`w-[100px] py-2 text-sm font-semibold transition-colors duration-200
          ${
            order === value ? "bg-white text-black" : "bg-[#1e1e1e] text-white"
          }`}
            >
              {ORDER_LABEL[value]}
            </button>
          ))}
        </div>
      </div>

      {/* 댓글 목록 */}
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.data.map((comment: Comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-300 py-3 text-sm"
            >
              <p className="mb-1">{comment.content}</p>
              <div className="text-xs text-gray-500">
                {comment.author.name} ·{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 더보기 버튼 (다음 페이지가 있을 때만) */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 text-sm text-white hover:text-gray-400"
        >
          댓글 더보기
        </button>
      )}

      {/* 댓글 작성 폼 */}
      <div className="mt-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-2 p-4 items-center"
        >
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="flex-1 h-10 border border-gray-300 rounded-md px-3 text-sm"
          />
          <button
            type="submit"
            disabled={!commentInput.trim() || isPending}
            className="h-10 px-4 bg-gray-400 text-white text-sm rounded-md disabled:opacity-50"
          >
            작성
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
