import { axiosInstance } from "../apis/axios.ts";
import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseSignupDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth.ts";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};

export const postLogout = async (): Promise<void> => {
  //파라미터가 없음 body에 들어갈 게 없으니까
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
