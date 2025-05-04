import { RequestSigninDto } from "../src/types/auth";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "../src/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../src/constants/key";
import { postSignin, postLogout } from "../src/apis/auth";
import React from "react";
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}
//context type 도 만들었고... 들고 올 거니까 우산을 만들어줘야 한다?

export const AuthContext = createContext<AuthContextType>({
  //초기값을 선언해주어야 한다.
  accessToken: null,
  refreshToken: null,
  login: async () => {}, //promise로 받아야 하니까 async로
  logout: async () => {},
});
//우산을 만들어주어야 한다.
//children 타입을 전달해줘야 한다. 이에 대한 타입은 PropsWithChildren으로 정의해주자.
//이름이 겹치지 않도록 : 뒤에 이름 재지정
export const AuthProvider = ({ children }: PropsWithChildren) => {
  //component
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenFromStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenFromStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  //accessToken 이 있으면 로그인된 상태이다 라는 상태를 만들어주자.
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage() //지연 초기화 => 처음에만 한번만 실행된다. 한번 값을 넣는데 매번 렌더링 될 필요 없으니까 //질문 1: useEffect 를 사용하면 되는 거 아닌가요?
  );
  //refreshToken 이 있으면 로그인된 상태이다 라는 상태를 만들어주자.
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const login = async (signinData: RequestSigninDto) => {
    //기본적으로 signinData를 받아야 한다.
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenFromStorage(newAccessToken);
        setRefreshTokenFromStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        window.location.href = "/my"; //로그인 성공하면 마이페이지로 이동
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      await postLogout(); //response가 필요없음.
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage(); //로그아웃하니까 토큰 삭제
      //LocalStroage.clear하면 대는 거 아닌가요 ? : 관련 정보가 아니라 다 지울 수도 있음(하지말자.)

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
      window.location.href = "/login"; //로그아웃하면 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
