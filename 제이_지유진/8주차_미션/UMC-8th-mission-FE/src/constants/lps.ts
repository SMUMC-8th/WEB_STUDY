import { axiosInstance } from "../apis/axios";
import { TOrder } from "../constants/enum";
import { CommonResponse } from "../types/common";

export type TLP = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  thumbnail: string | null;
  published: boolean;
  tags: TTags[];
  likes: TLikes[];
};

export type getLPRequest = {
  order: TOrder;
  cursor: number;
  search: string;
};

export type getCommentsRequest = {
  order: TOrder;
  cursor: number;
  lpId: number;
};
export type TGetCommentsResponse = CommonResponse<{
  data: TLP[];
  hasNext: boolean;
  nextCursor: number;
  cursor: number;
}>;

export type TGetLPResponse = CommonResponse<{
  data: TLP[];
  hasNext: boolean;
  nextCursor: number;
  cursor: number;
}>;

export type TTags = {
  id: number;
  name: string;
};

export type TLikes = {
  id: number;
  userId: number;
  lpId: number;
};

export const postLike = async (lpId: number) => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`v1/lps/${lpId}/likes`);
  return data;
};
