import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Pencil, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../apis/lp";
import { queryClient } from "../App";
import CommentSection from "../components/Comment/CommentSection";

const LpDetailPage = () => {
  const { lpId } = useParams(); // URL에서 lpId를 추출
  const { accessToken } = useAuth(); // 로그인한 사용자의 accessToken 받아오기

  // LP 상세 정보 가져오기 (lpId 기반)
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  // 로그인한 사용자 정보 가져오기
  const { data: me } = useGetMyInfo(accessToken);

  // 좋아요 등록/취소를 위한 mutation 훅
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // 로그인 사용자가 이 LP에 좋아요를 눌렀는지 여부 확인
  // 데이터 id랑 유저 id랑 같은지 비교
  const isLiked =
    lp?.data.likes.some((like) => like.userId === me?.data.id) ?? false;

  // 좋아요 등록 함수
  const handleLikeLp = async () => {
    likeMutate({ lpId: Number(lpId) });
  };

  // 좋아요 취소 함수
  const handleDisLikeLp = async () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  // // 내가 이 글을 쓴 작성자인지 검사하는 함수
  // const isWriter = (authorId: number | undefined, userId: number): boolean => {
  //   return authorId === userId;
  // };

  const { mutate: deleteLPMutate } = useMutation({
    mutationFn: () => deleteLp({ lpId: Number(lpId) }),
    onSuccess: () => {
      alert("삭제가 완료되었습니다.");
      // 관련 쿼리 무효화 (예: 리스트 갱신용)
      queryClient.invalidateQueries({ queryKey: ["lps"] });
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  // 쓰레기통 클릭 -> 글 삭제하는거
  const useDeleteLp = () => {
    deleteLPMutate();
  };

  /// 로딩 중이거나 에러가 발생한 경우 아무것도 렌더링하지 않음
  if (isPending) return <p className="text-white p-8">로딩 중...</p>;
  if (isError) return <p className="text-red-400 p-8">에러가 발생했습니다.</p>;

  return (
    <div className="bg-black flex justify-center px-4 py-12 overflow-hidden">
      {/* LP 카드 내부 컨테이너 */}
      <div className="bg-[#1e1e1e] w-full max-w-2xl rounded-xl shadow-xl flex flex-col justify-between py-8 px-6">
        {/* 상단: 작성자, 날짜, 제목, 수정/삭제 */}
        <div>
          {/* 작성자 정보 + 작성일 */}
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
            <div className="flex items-center gap-2">
              <img
                src=""
                alt=""
                className="w-7 h-7 rounded-full object-cover bg-white"
              />
              <span className="font-semibold">작성자</span>
            </div>
            <span>1일 전</span>
          </div>

          {/* 제목 + 수정/삭제 아이콘 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Title</h1>
            <div className="flex gap-2 text-gray-300">
              <button>
                <Pencil size={20} />
              </button>
              <button onClick={useDeleteLp}>
                <Trash size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 중간: CD 썸네일 */}
        <div className="flex justify-center my-8">
          <div className="relative w-64 h-64">
            {/* 정사각형 그림자 배경 (CD 뒷배경 느낌) */}
            <div className="absolute inset-0 bg-[#2a2a2a] rounded-md shadow-md scale-110" />

            {/* 둥근 CD 이미지 */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg animate-spin-slow z-10">
              <img
                src={lp?.data.thumbnail}
                alt={lp?.data.title}
                className="w-full h-full object-cover rounded-full bg-white"
              />

              {/* 중앙 구멍 부분 */}
              <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] bg-[#1e1e1e] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner" />
            </div>
          </div>
        </div>

        {/* 하단: 설명, 해시태그, 좋아요 */}
        <div className="space-y-6">
          <p className="text-sm text-gray-300 text-center leading-relaxed">
            {lp?.data.content}
          </p>
          {/* 해시태그 리스트 */}
          <div className="flex flex-wrap gap-2 justify-center">
            {lp?.data.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-700 px-3 py-1 text-xs rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          {/* 좋아요 수 + 아이콘 */}
          <div className="flex justify-center items-center gap-2">
            <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
              <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "transparent"}
                className="w-5 h-5 "
              />
            </button>
            <span className="text-sm text-white">{lp?.data.likes.length}</span>
          </div>
          {/* 댓글 */}
          {lpId && <CommentSection lpId={lpId} />}
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
