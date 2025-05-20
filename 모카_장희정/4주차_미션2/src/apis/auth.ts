import { axiosInstance } from "./axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { ResponseMyInfoDto } from "../types/auth";
import { AxiosError } from "axios";

// 회원가입
export async function postSignup(data: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const response = await axiosInstance.post("/v1/auth/signup", data); // ←  슬래시 추가
    console.log(" signup 응답 확인:", response.data); // ← 확인용 로그 추가
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    if (error instanceof AxiosError) {
      console.error("응답 내용:", error.response?.data);
    }
    throw error;
  }
}

// 로그인
export async function postSignin(data: { email: string; password: string }) {
  try {
    const response = await axiosInstance.post("/v1/auth/signin", data);
    console.log(" signin 응답 확인:", response.data); // ← 확인용 로그 추가
    return response.data;
  } catch (error) {
    console.error("Signin Error:", error);
    if (error instanceof AxiosError) {
      console.error("응답 내용:", error.response?.data);
    }
    throw error;
  }
}

// 내 정보 가져오기
export async function getMyInfo(): Promise<ResponseMyInfoDto> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const response = await axiosInstance.get("/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getMyInfo Error:", error);
    throw error;
  }
}

// 로그아웃
export const postLogout = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const response = await axiosInstance.post("/v1/auth/signout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};
