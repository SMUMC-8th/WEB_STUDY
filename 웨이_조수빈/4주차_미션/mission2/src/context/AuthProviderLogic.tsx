import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { RequestSigninDto } from "../types/auth";
import { postSignin, postLogout } from "../apis/auth";

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
    }
  }, [getAccessTokenFromStorage, getRefreshTokenFromStorage]);

  const login = async (signinData: RequestSigninDto) => {
    const response = await postSignin(signinData);
    const { accessToken, refreshToken } = response.data;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setAccessTokenInStorage(accessToken);
    setRefreshTokenInStorage(refreshToken);
  };

  const logout = async () => {
    await postLogout();
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
