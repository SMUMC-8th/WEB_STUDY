import { axiosInstance } from "./axios";
import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth.ts";
import { AxiosError } from "axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  try {
    console.log("회원가입 요청 데이터:", {
      email: body.email,
      name: body.name,
      password: "****",
    });

    const response = await axiosInstance.post("/v1/auth/signup", {
      email: body.email,
      password: body.password,
      name: body.name,
    });

    console.log("회원가입 성공:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("회원가입 실패:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
            ? {
                ...JSON.parse(error.config.data),
                password: "****",
              }
            : null,
        },
      });
    } else {
      console.error("네트워크 에러:", error);
    }
    throw error;
  }
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  try {
    console.log("Attempting to sign in with:", { ...body, password: "****" });
    const response = await axiosInstance.post("/v1/auth/signin", body);
    console.log("Signin success:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Signin request failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    throw error;
  }
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};
