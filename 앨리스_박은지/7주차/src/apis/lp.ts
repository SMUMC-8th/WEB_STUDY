import { PaginationDto } from "../types/common.ts";
import {
  ResponseLPListDto,
  RequestLpDto,
  ResponseLpDto,
  ResponseLikeLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLPListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpDetail = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);

  return data;
};

export const postLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};
