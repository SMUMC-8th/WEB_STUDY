import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStoage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

// useContext : 어떤 컴포넌트든 context를 통해 전역처럼 접근 가능함

// 1. Context에서 사용할 타입 정의
interface AuthContextType {
  accessToken: string | null; // 로그인한 사용자의 액세스 토큰 (로그인하지 않은 경우 null)
  refreshToken: string | null; // 리프레시 토큰 (토큰 만료 시 재발급 요청용)
  user: { name: string } | null; // ✅ 추가됨: 사용자 이름
  login: (signInDate: RequestSigninDto) => Promise<void>; // 로그인 함수: 사용자 정보(email, password)를 받아 로그인 처리(비동기 함수)
  logout: () => Promise<void>; // 로그아웃 함수: 서버 로그아웃 + 클라이언트 상태 초기화
}

// 2. Context 생성
// 초기값은 null 또는 빈 함수들로 설정됨 (실제 구현은 Provider 안에서)
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null, // ✅ 추가됨
  login: async () => {}, // 기본 로그인 함수
  logout: async () => {}, // 기본 로그아웃 함수
});

// 3. Provider 컴포넌트 정의
export const AuthProvider = ({ children }: PropsWithChildren) => {
  // accessToken을 로컬스토리지에서 get/set/remove 하는 훅 사용
  const {
    getItem: getAcessTokenFromStorage,
    setItem: setAcessTokenInStorage,
    removeItem: removeAcessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // refreshToken도 마찬가지로 훅으로 관리
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken 상태 설정
  // useState를 통해서 accessToken이라는 상태를 선언하고, 초기값을 getAcessTokenFromStorage()의 반환값으로 설정
  // 페이지가 처음 로드될 때 로컬스토리지에 accessToken이 있으면 그걸 상태값으로 설정하고, 없으면 null
  const [accessToken, setAccessToken] = useState<string | null>(
    getAcessTokenFromStorage()
  );

  // refreshToken도 상태 관리 : 초기값을 로컬스토리지에서 꺼낸 값으로 설정.
  // 로그인이 되면 이 값을 새로 세팅(setRefreshToken), 로그아웃하면 null로 리셋.
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const [user, setUser] = useState<{ name: string } | null>(null); // ✅ 추가됨

  // 로그인 함수
  const login = async (signinData: RequestSigninDto) => {
    try {
      // 1. 로그인 API 호출 : 사용자가 입력한 이메일/비밀번호를 서버에 전송
      const { data } = await postSignin(signinData);

      if (data) {
        // 응답에 데이터가 존재할 경우(로그인 성공 시)
        // 1. data에서 토큰을 추출
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        const userName = data.name; // ✅ 추가됨

        // 2. 로컬스토리지에 토큰 저장
        setAcessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setUser({ name: userName }); // ✅ 추가됨

        // 3. react 상태에도 토큰 저장(Context를 통해 다른 컴포넌트에서 사용 가능하게 함)
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        window.location.href = "/mypage"; // 로그인 후 마이페이지로 이동
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청을 보냄
      await postLogout();

      // 로컬스토리지에 저장되어 있던 토큰 값을 제거함
      removeAcessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // react 내부 상태도 초기화함
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null); // ✅ 추가됨: user 상태도 초기화

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  // Provider : context의 공급자 역할을 하는 컴포넌트
  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Context 사용을 위한 훅
export const useAuth = () => {
  const context = useContext(AuthContext);

  // 에러 헨들링
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
