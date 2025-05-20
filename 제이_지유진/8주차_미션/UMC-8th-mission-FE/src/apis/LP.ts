import {
  getCommentsRequest,
  getLPRequest,
  TGetCommentsResponse,
  TGetLPResponse,
} from "../constants/lps";
import { RequestLpDto, TPostLPRequest } from "../types/lp";
import { axiosInstance } from "./axios";

const getLP = async ({
  order,
  cursor,
  search,
}: getLPRequest): Promise<TGetLPResponse> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: { order, cursor, search },
  });
  return data;
};

export default getLP;

export const getLpDetail = async ({ lpId }: RequestLpDto) => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}`); //dynamic 으로 lpId를 넣어줘야함
  return data; //data를 받을 수 있게
};

export const deleteLp = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}`);
  return data;
};

export const postLP = async ({
  title,
  content,
  tags,
  thumbnail,
  published,
}: TPostLPRequest) => {
  const { data } = await axiosInstance.post("v1/lps", {
    title,
    content,
    tags,
    thumbnail,
    published,
  });
  return data;
};

export const getComments = async ({
  lpId,
  order,
  cursor,
}: getCommentsRequest): Promise<TGetCommentsResponse> => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}/comments`, {
    params: { order, cursor },
  });
  return data;
};
