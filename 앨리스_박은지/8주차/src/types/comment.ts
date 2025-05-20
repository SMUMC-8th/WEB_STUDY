import { CommonResponse } from "./common";
import { CursorBasedResponse } from "./common";

export interface Comment {
  id: number;
  content: string;
  lpid: number;
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

export type PostCommentsResponse = CursorBasedResponse<{
  data: Comment[];
}>;
