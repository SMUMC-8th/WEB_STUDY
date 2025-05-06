import { getLPRequest, TGetLPResponse } from "../constants/lps";
import { axiosInstance } from "./axios";

const getLP = async ({
  order,
  cursor,
}: getLPRequest): Promise<TGetLPResponse> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: { order, cursor },
  });
  return data;
};

export default getLP;
