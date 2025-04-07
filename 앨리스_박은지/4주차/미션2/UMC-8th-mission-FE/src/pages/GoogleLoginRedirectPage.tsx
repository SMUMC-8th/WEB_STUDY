import { useEffect } from "react";

import { LOCAL_STORAGE_KEY } from "../constants/localStorage";

function GoogleLoginRedirectPage() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my-page";
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉트 화면</div>;
}

export default GoogleLoginRedirectPage;
