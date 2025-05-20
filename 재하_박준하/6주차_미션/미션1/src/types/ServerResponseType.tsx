import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export type signinResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
};

export type LpListResponse = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: [];
  likes: [];
};

export type userInfo = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: boolean;
    avatar: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type lpDetail = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: {
      id: number;
      name: string;
    }[];
    likes: {
      id: number;
      userId: number;
      lpId: number;
    }[];
    author: {
      id: number;
      name: string;
      email: string;
      bio: null | string;
      avatar: null | string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
