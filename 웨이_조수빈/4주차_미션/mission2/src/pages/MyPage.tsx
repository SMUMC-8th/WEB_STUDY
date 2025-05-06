import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        console.log("MyInfo Response:", response);
        setData(response);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setError("사용자 정보를 가져오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="cursor-pointer bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="mb-4">사용자 정보가 없습니다.</p>
        <button
          className="cursor-pointer bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          {data.data.name}님 환영합니다.
        </h1>
        {data.data.avatar && (
          <img
            src={data.data.avatar}
            alt="프로필 이미지"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        )}
        <p className="text-lg mb-8">{data.data.email}</p>
        <button
          className="cursor-pointer bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600 transition-transform hover:scale-105"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;