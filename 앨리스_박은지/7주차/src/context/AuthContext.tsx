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

interface UserType {
  name: string;
  avatar?: string;
  email?: string;
  bio?: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext: React.Context<AuthContextType> =
  createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    user: null,
    setUser: () => {},
    isLogin: false,
    setIsLogin: () => {},
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
  const [user, setUser] = useState<UserType | null>(null);
  const [isLogin, setIsLogin] = useState(false);
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
      const response = await postSignin(signinData);

      if (response && response.data) {
        const { accessToken, refreshToken, name, avatar, email, bio } =
          response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setAccessTokenInStorage(accessToken);
        setRefreshTokenInStorage(refreshToken);
        setIsLogin(true);
        setUser({ name, avatar, email, bio });
      } else {
        throw new Error("로그인 응답이 올바르지 않습니다");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
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
      setUser(null);
      setIsLogin(false);
    } catch (error) {
      console.error("로그아웃 오류", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
        user,
        setUser,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
