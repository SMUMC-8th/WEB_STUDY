import { CommonResponse } from "./common";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export type GetCommentsResponse = CommonResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
