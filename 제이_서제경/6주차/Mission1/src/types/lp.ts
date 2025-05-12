import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: 4;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

// 글 삭제 : LP 글을 삭제한 결과가 성공했는지 실패했는지를 알려주는 API 응답 타입
export type TDeleteLpResponse = CommonResponse<{ data: boolean }>;

export type TPostLP = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string | null;
  published: boolean;
};

export type TPostLPResponse = CommonResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: 4;
    createdAt: Date;
    updatedAt: Date;
  };
}>;
