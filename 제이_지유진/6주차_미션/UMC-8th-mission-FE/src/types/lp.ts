export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  authorName: string;
  authorAvatarUrl: string | null;
  isMine: boolean;
  isBookmarked: boolean;
};

export type TPostLikeResponse = {
  data: {
    id: number;
    userId: number;
    lpId: number;
  };
};

export type TDeleteLikeResponse = {
  data: {
    id: number;
    userId: number;
    lpId: number;
  };
};

export type TPostLPRequest = {
  title: string;
  content: string;
  tags: string[];
  thumbnail: File | null;
  published: boolean;
};
