import { useEffect, useState } from "react";
import { umcServerNeedAuth } from "../utils/axiosInfo";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type UserInfoType = {
  avatar: null;
  bio: null;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  updatedAt: string;
};

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function getMyInfo() {
    try {
      const { data } = await umcServerNeedAuth.get(`/v1/users/me`);

      setUserInfo(data.data);
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 401) {
          logout();
          navigate("/signin");
        }
        console.log("Response:", err.response);
        // console.log("Request:", err.request);
        // console.log("Message:", err.message);
      }
    }
  }

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <>
      <div className="mb-5 text-3xl text-white">MyPage</div>
      <div className="text-3xl text-white">{`${userInfo?.email}`}</div>
    </>
  );
}
