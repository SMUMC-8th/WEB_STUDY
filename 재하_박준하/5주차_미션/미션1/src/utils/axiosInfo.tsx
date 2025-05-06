import axios from "axios";

export const umcServerNoAuth = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
  timeout: 1000,
  headers: { accept: "application/json" },
});

export const umcServerNeedAuth = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
  timeout: 1000,
  headers: { accept: "application/json" },
});

umcServerNeedAuth.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  // accessToken이 존재할 경우 포함시키기
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }
  return config;
});

// 컴포넌트가 마운트시 토큰 확인
// useEffect(() => {
//   checkExistingTokens();
// }, []);

// async function checkExistingTokens() {
//   const accessToken = sessionStorage.getItem("accessToken");

//   if (refreshToken && accessToken) {
//     // 토큰이 모두 존재하는 경우
//     navigate("/");
//   } else if (refreshToken && !accessToken) {
//     // refreshToken만 있는 경우
//     // 새 accessToken 요청
//     try {
//       setIsFetching(true);
//       const response = await umcServer.post("/v1/auth/token", {
//         refreshToken: refreshToken,
//       });

//       if (response.data && response.data.accessToken) {
//         sessionStorage.setItem("accessToken", response.data.accessToken);
//         navigate("/");
//       }
//     } catch (err) {
//       // 리프레시 토큰이 유효하지 않은 경우
//       // 제거
//       setRefreshToken("");
//       // console.log(err);
//     } finally {
//       setIsFetching(false);
//     }
//   }
// }
