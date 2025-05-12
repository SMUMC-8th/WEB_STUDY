// 인증 관련 API 요청 함수를 모아둔 파일

// 인증 관련 요청에서 사용할 타입들 import
// Request : 서버한테 보내는 데이터, Response : 서버가 돌려주는 데이터
// => email, password를 보내고, 서버에게 acessToken을 받음
import {
  RequestSigninDto, // 로그인 요청 시 필요한 데이터 타입 (email, password 등)
  RequestSignupDto, // 회원가입 요청 시 필요한 데이터 타입
  ResponseMyInfoDto, // 내 정보 응답 데이터 타입
  ResponseSigninDto, // 로그인 응답 데이터 타입 (ex: accessToken)
  ResponseSignupDto, // 회원가입 응답 데이터 타입
} from "../types/auth";

// axios 인스턴스 import (기본 URL, 헤더 등이 설정된 axios)
import { axiosInstance } from "./axios";

// 회원가입 요청 함수
export const postSignup = async (
  body: RequestSignupDto // name, email, password 등 회원가입 정보
): Promise<ResponseSignupDto> => {
  // POST 요청: /v1/auth/signup 경로로 body 데이터를 전송
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data; // 서버 응답 데이터 반환 (예: 회원 정보, 메시지 등)
};

// 로그인 요청 함수
export const postSignin = async (
  body: RequestSigninDto // email, password 정보
): Promise<ResponseSigninDto> => {
  // POST 요청: /v1/auth/signin 경로로 로그인 정보 전송
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data; // 서버 응답 데이터 반환 (예: accessToken 등)
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  // POST 요청: /v1/users/me 경로로 사용자 정보 요청 (보통 accessToken이 필요)
  const { data } = await axiosInstance.get("/v1/users/me");

  return data; // 사용자 정보 응답 반환
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");

  return data;
};
