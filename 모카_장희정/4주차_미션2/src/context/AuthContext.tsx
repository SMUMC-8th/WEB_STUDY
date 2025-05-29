import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto } from "../types/auth";
import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
  });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = getAccessTokenFromStorage();
    const storedRefreshToken = getRefreshTokenFromStorage();

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    } else {
      setAccessToken(null);
      setRefreshToken(null);
    }
  }, []);

  const login = async (signinData: RequestSigninDto) => {
    try {
      console.log("로그인 시도:", signinData);
      const response = await postSignin(signinData);
      console.log("로그인 응답:", response);

      if (response && response.data) {
        const { accessToken, refreshToken } = response.data;
        console.log("토큰 정보:", { accessToken, refreshToken });

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setAccessTokenInStorage(accessToken);
        setRefreshTokenInStorage(refreshToken);

        console.log("토큰 저장 완료");
        alert("로그인 성공");
        window.location.href = "/my-page";
      } else {
        console.error("로그인 응답이 올바르지 않습니다:", response);
        alert("로그인 실패: 응답이 올바르지 않습니다");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      const token = getAccessTokenFromStorage();
      if (token) {
        await postLogout();
      }
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 성공");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
