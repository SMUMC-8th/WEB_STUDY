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
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type RequestLpDto = {
  lpid: number;
};

export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLPListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type TDeleteLpResponse = CommonResponse<{
  message: string;
}>;

export type RequestPostLpDto = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCommentDto = {
  content: string;
  lpId: number;
};

export type TAuthor = {
  id: number;
  name: string;
  bio: string | null;
  avatar: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
};
export type TResponsePostComment = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: TAuthor;
}>;
