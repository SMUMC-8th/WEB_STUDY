import { useEffect, useState, useRef } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { Check, Settings } from "lucide-react";
import usePatchMyInfo from "../hooks/mutation/usePatchMyInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { mutate } = usePatchMyInfo();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (data && data.data) {
      setProfileImg(data.data.avatar || null);
      setName(data.data.name || "");
      setBio(data.data.bio || "");
    }
  }, [data]);

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // 이름 유효성 검사
    if (!name.trim()) {
      setNameError("이름은 필수 입력 항목입니다.");
      return;
    }
    setNameError(null);

    // 프로필 업데이트
    mutate(
      {
        name: name.trim(),
        bio: bio.trim() || undefined,
        avatar: profileImg || undefined,
      },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          // 데이터 새로고침
          getMyInfo().then((response) => {
            setData(response);
          });
        },
        onError: () => {
          alert("프로필 업데이트에 실패했습니다.");
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
        <p className="mb-4">사용자 정보가 없습니다.</p>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 text-white bg-black">
      <div className="w-full max-w-2xl">
        <div className="flex items-start gap-8 p-8">
          <div className="flex-shrink-0">
            {data.data.avatar ? (
              <img
                src={data.data.avatar}
                alt="프로필 이미지"
                className="w-32 h-32 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-white" />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-40 mb-4">
              <h1 className="text-2xl font-bold">{data.data.name}</h1>
              <button
                onClick={() => setIsEditOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Settings size={27} />
              </button>
            </div>
            <p className="text-gray-400 mb-2">{data.data.email}</p>
            <p className="text-gray-300">
              {data.data.bio || "자기소개가 없습니다."}
            </p>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black rounded-2xl p-8 flex flex-col items-center w-[400px] border border-white relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setIsEditOpen(false)}
            >
              ×
            </button>
            <img
              src={profileImg || "/default-profile.png"}
              className="w-40 h-40 rounded-full object-cover mb-6 border-2 border-white cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfileImgChange}
            />
            <div className="flex items-center w-full mb-5 mt-5">
              <div className="flex items-center gap-10">
                <input
                  className={`flex-1 p-3 rounded-lg bg-black text-white border ${
                    nameError ? "border-red-500" : "border-white"
                  } font-medium max-w-[380px]`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(null);
                  }}
                  placeholder="이름을 입력하세요"
                />
                <button
                  onClick={handleSave}
                  className="text-white text-2xl p-2 rounded-full hover:bg-white hover:text-black transition flex-shrink-0"
                >
                  <Check />
                </button>
              </div>
            </div>
            {nameError && (
              <p className="text-red-500 text-xs mb-5 w-full text-left">
                {nameError}
              </p>
            )}
            <input
              className="w-full p-3 rounded-lg bg-black text-white border border-white mb-4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요. (선택사항)"
            />
            <div className="text-white text-left text-lg font-medium mt-2">
              이메일: {data.data.email}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
