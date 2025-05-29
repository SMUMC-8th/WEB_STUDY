import { useMutation } from "@tanstack/react-query";
import { postComments } from "../../apis/lp";

export function useComment() {
  return useMutation({
    mutationFn: postComments,
  });
}
