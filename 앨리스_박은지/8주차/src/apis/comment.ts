import { axiosInstance } from "./axios";
import { GetCommentsResponse } from "../types/comment";

interface GetCommentsParams {
  lpId: string;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}

export const getComments = async ({
  lpId,
  cursor,
  limit = 10,
  order = "desc",
}: GetCommentsParams) => {
  const { data } = await axiosInstance.get<GetCommentsResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: {
        cursor,
        limit,
        order,
      },
    }
  );
  return data;
};
