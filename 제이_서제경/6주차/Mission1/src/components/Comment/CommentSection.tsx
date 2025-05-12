// [CommentSection.tsx]
// LP Detail 페이지에서 사용되는 댓글 컴포넌트
// 댓글 목록을 서버에서 불러오고, 무한 스크롤 및 최신순/오래된순 정렬 기능 제공

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Comment } from "../../types/comment";
import { getComments } from "../../apis/comment";
import { ORDER_LABEL, TOrder } from "../../constants/enum";
import CommentSkeletonList from "./CommentSkeletonList";

function CommentSection({ lpId }: { lpId: string }) {
  // 정렬 기준 (최신순/오래된순)
  const [order, setOrder] = useState<TOrder>(TOrder.NEWEST);

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

      {/* 댓글 작성 폼 (일단 디자인만) */}
      <div className="mt-6 border rounded-lg p-3 text-sm text-gray-400 bg-gray-50">
        댓글을 작성해주세요
      </div>
    </div>
  );
}

export default CommentSection;
