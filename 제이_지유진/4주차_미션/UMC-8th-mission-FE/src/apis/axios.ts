import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 promise 를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터: 모든 요청 전에 accessToken 을 Authorization 헤더에 추가한다.

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); //로컬 스토리지에서 accessToken을 가져온다.
    //accessToken이 존재하면 Authorization 헤더에 Bearer {accessToken} 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`; //accessToken을 Authorization 헤더에 추가한다.
    }

    //수정된 요청 설정을 반환합니다.
    return config;
  },
  //요청 오류가 발생한 경우
  (error) => Promise.reject(error)
);

//응답 인터셉터: 모든 응답을 가로채서 처리한다.:401 에러 발생 -> refreshToken 요청
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, //정상 응답 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config; //원래 요청을 가져온다.

    //refresh endpoint 401 에러 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh endpoint에 대한 요청을 보내기 전에 refreshPromise가 null인지 확인
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken(); //accessToken 삭제
        removeRefreshToken(); //refreshToken 삭제
        window.location.href = "/login"; //로그인 페이지로 리다이렉트
        return Promise.reject(error); //에러를 반환
      }
      //재시도 플래그 설정
      originalRequest._retry = true;

      //이미 리프레시 토큰 요청이 진행 중인 경우, 해당 요청의 Promise를 사용
      if (refreshPromise) {
        //refresh 요청 실행 후 , promise 를 전역변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken(); //로컬 스토리지에서 refreshToken을 가져온다.

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          //새토큰 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken); //로컬 스토리지에 accessToken 저장
          setRefreshToken(data.data.refreshToken); //로컬 스토리지에 refreshToken 저장
          return data.data.accessToken; //새로운 accessToken 반환하여 다른 요청들이 이것을 사용할 수 있게함.
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken(); //accessToken 삭제
            removeRefreshToken(); //refreshToken 삭제
          })
          .finally(() => {
            refreshPromise = null; //요청이 완료되면 promise를 null로 초기화
          });
      }
      //진행중인 RefreshPromise가 해결될때까지 기다림.
      return refreshPromise?.then((newAccessToken: string) => {
        //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; //새로운 accessToken을 Authorization 헤더에 추가
        return axiosInstance(originalRequest); //원래 요청을 재시도
      });
    }
    //401 에러가 아닌 경우 그대로 오류 반환
    return Promise.reject(error);
  }
);
