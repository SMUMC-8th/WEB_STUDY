import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import {useLocalStorage} from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
     LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
     LOCAL_STORAGE_KEY.refreshToken
  );

  const navigate=useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("구글 로그인 성공!");

      navigate("/mypage");
    } else{
      alert("구글 로그인 실패!");
      navigate("/login");
    }
  },[]);

  return <div>구글 로그인 진행중...</div>;
};

export default GoogleLoginRedirectPage;