import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../../hooks/queries/useGetLpDetail";
import { CommentContainer } from "../Comment/CommentContainer";
import { useState } from "react";
import { Heart, Pen, Trash, MessageCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext.tsx";
import usePostLike from "../../hooks/mutation/usePostLike";
import useDeleteLike from "../../hooks/mutation/useDeleteLike";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App.tsx";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lpDetail,
    isPending,
    isError,
  } = useGetLpDetail({ lpid: Number(lpId) });
  const lp = lpDetail?.data;
  const navigate = useNavigate();
  const { data: me } = useGetMyInfo(accessToken);
  //mutate -> 비동기 요청을 실행하고, 콜백 함수를 이요해서 후속 작업 처리함.
  //mutateAsync -> Promise를 반환해서 await 사용 가능.
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked =
    lp?.likes?.map((like) => like.userId).includes(me?.data.id as number) ||
    false;
  const [showComments, setShowComments] = useState(false);

  const handleLikeLp = () => {
    likeMutate({ lpid: Number(lpId) });
  };
  const handleDislikeLp = () => {
    disLikeMutate({ lpid: Number(lpId) });
  };

  const { mutate: deleteLpMutate } = useMutation({
    mutationFn: () => deleteLp({ lpId: Number(lpId) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLps"] });
      navigate("/");
    },
  });

  const handleDelete = () => {
    deleteLpMutate();
  };

  if (isPending) {
    console.log("isPending", isPending);
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError || !lp) {
    return (
      <div className="text-center py-12 text-red-500">
        Lp Detail을 불러오는 데 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-white text-sm">{lp.title}</h2>
                  <p className="text-gray-400 text-xs">
                    {new Date(lp.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white p-1">
                  <Pen />
                </button>
                <button className="text-gray-400 hover:text-white p-1">
                  <Trash onClick={handleDelete} />
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-96 h-96 bg-[#2A2A2A] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg">
                <div className="w-80 h-80 relative">
                  <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full h-full object-cover rounded-full shadow-lg infinite_rotating animate-spin"
                    style={{ transform: "rotate(360deg)" }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <p className="text-gray-400 text-sm">{lp.content}</p>
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={isLiked ? handleDislikeLp : handleLikeLp}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <Heart
                    color={isLiked ? "red" : "white"}
                    size={25}
                    fill={isLiked ? "red" : "transparent"}
                  />
                  <span>{lp.likes.length}</span>
                </button>
                <button
                  onClick={() => setShowComments(true)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <MessageCircle color="white" />
                  <span>댓글</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentContainer
          lpId={lpId || ""}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default LpDetailPage;
