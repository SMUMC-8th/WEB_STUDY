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
};

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
