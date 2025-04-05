import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    getData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>내 정보</h1>
      <p>이름: {data.data.name}</p>
      <p>이메일: {data.data.email}</p>
      {data.data.bio && <p>소개: {data.data.bio}</p>}
      {data.data.avatar && (
        <div>
          <p>프로필 이미지:</p>
          <img src={data.data.avatar} alt="프로필 이미지" />
        </div>
      )}
    </div>
  );
};

export default MyPage;
