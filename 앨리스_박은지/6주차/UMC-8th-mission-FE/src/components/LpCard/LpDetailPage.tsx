import { useParams } from "react-router-dom";
import useGetLpDetail from "../../hooks/queries/useGetLpDetail";
import { CommentContainer } from "../Comment/CommentContainer";
import { useState } from "react";
import { Heart, Pen, Trash, MessageCircle } from "lucide-react";

const LpDetailPage = () => {
  const { lpId } = useParams();
  console.log("lpId", lpId);
  const {
    data: lpDetail,
    isPending,
    isError,
  } = useGetLpDetail({ lpid: Number(lpId) });
  const lp = lpDetail?.data;
  const [showComments, setShowComments] = useState(false);

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
                  <Trash />
                </button>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-96 h-96 bg-[#2A2A2A] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-lg">
                <div className="w-80 h-80 relative">
                  <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <p className="text-gray-400 text-sm">{lp.content}</p>
              <div className="flex items-center justify-center space-x-4">
                <button className="bg-transparent border border-pink-500 text-pink-500 px-4 py-1.5 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm">
                  <Heart />
                  <span>{lp.likes.length}</span>
                </button>
                <button
                  onClick={() => setShowComments(true)}
                  className="bg-transparent border border-gray-500 text-gray-400 px-4 py-1.5 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm"
                >
                  <MessageCircle />
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
