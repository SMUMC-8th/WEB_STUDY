import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getComments } from "../../apis/comment";
import { Comment } from "./Comment";
import { GetCommentsResponse } from "../../types/comment";
import { IoChevronBack } from "react-icons/io5";

interface CommentContainerProps {
  lpId: string;
  onClose: () => void;
}

export const CommentContainer = ({ lpId, onClose }: CommentContainerProps) => {
  const { ref, inView } = useInView();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<GetCommentsResponse>({
      queryKey: ["comments", lpId, order],
      initialPageParam: null,
      queryFn: ({ pageParam }) =>
        getComments({ lpId, cursor: pageParam as number | undefined, order }),
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <IoChevronBack size={20} />
            </button>
            <h3 className="text-base font-semibold text-white">댓글</h3>
          </div>
          <div className="flex text-sm border border-gray-700 rounded-md overflow-hidden">
            <button
              onClick={() => setOrder("asc")}
              className={`px-2.5 py-1 text-xs font-semibold ${
                order === "asc" ? "bg-white text-black" : "text-gray-400"
              } border-r border-gray-700`}
            >
              오래된 순
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`px-2.5 py-1 text-xs font-semibold ${
                order === "desc" ? "bg-white text-black" : "text-gray-400"
              }`}
            >
              최신 순
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-3 mb-4">
            <textarea
              ref={inputRef}
              className="flex-grow px-3 py-2 border border-gray-700 rounded-lg resize-none h-[38px] min-h-[38px] bg-[#2A2A2A] text-white placeholder-gray-400 text-sm overflow-hidden"
              placeholder="댓글을 입력해주세요"
              style={{ resize: "none" }}
            />
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm whitespace-nowrap">
              작성
            </button>
          </div>

          <div className="space-y-2 max-h-[50vh] overflow-y-auto hide-scrollbar">
            {status === "pending" ? (
              <div className="text-gray-400 text-center py-4">
                댓글을 불러오는 중...
              </div>
            ) : status === "error" ? (
              <div className="text-gray-400 text-center py-4">
                댓글을 불러오지 못했습니다.
              </div>
            ) : (
              <>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
                {hasNextPage && (
                  <div ref={ref} className="py-3 text-center">
                    {isFetchingNextPage ? (
                      <div className="text-gray-400">댓글을 불러오는 중...</div>
                    ) : (
                      <button
                        onClick={() => fetchNextPage()}
                        className="text-pink-500 hover:text-pink-600 text-sm"
                      >
                        댓글 더 보기
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
