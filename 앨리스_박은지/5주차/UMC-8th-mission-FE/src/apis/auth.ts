import { axiosInstance } from "./axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { ResponseMyInfoDto } from "../types/auth";

export async function postSignup(data: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const response = await axiosInstance.post("v1/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
}

export async function postSignin(data: { email: string; password: string }) {
  try {
    const response = await axiosInstance.post("v1/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error("Signin Error:", error);
    throw error;
  }
}

export async function getMyInfo(): Promise<ResponseMyInfoDto> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const response = await axiosInstance.get("v1/users/me", {
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

export const postLogout = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  try {
    const response = await axiosInstance.post("v1/auth/signout", null, {
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
