import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";

function GoogleLoginRedirectPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      // 로컬 스토리지에 저장
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken);
    }

    window.location.href = "/my-page";
  }, []);

  return <div>구글 로그인 리다이렉트 화면</div>;
}

export default GoogleLoginRedirectPage;
