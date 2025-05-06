// 로그인, 회원가입, 내 정보 조회 시 서버와 주고받는 데이터의 타입을 정의해둔 파일

// 공통 응답 파입을 가져오는거
import { CommonResponse } from "./common";

// [회원가입] 요청 시에 서버에 보낼 데이터 타입을 정의
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string; // 자기소개 (선택)
  avatar?: string; // 아바타 이미지(선택)
  password: string;
};

// [회원가입] 성공 시 서버로부터 받는 응답 타입
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null; // 자기소개 (null 가능)
  avatar: string | null; // 프로필 이미지 (null 가능)
  createdAt: Date; // 계정 생성일
  updatedAt: Date; // 마지막 수정일
}>;

// [로그인] 요청 시 서버에 보낼 데이터 타입
export type RequestSigninDto = {
  email: string;
  password: string;
};

// [로그인] 응답 타입 : 로그인하면 사용자 정보, 토큰을 함께 반환
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string; // 액세스 토큰 (JWT) : API요청 시 인증 정보로 사용
  refreshToken: string; // 리프레시 토큰 : 액세스 토큰 만료 시 새로운 토큰 받기 위해 사용
}>;

// [내 정보 조회] 할 때 받는 응답 타입 : 로그인된 사용자의 정보 상세
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
