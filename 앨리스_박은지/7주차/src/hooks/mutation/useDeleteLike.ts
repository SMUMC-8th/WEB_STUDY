import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { ResponseMyInfoDto } from "../../types/auth";
import { Likes } from "../../types/lp";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    //onMutate -> API 요청 이전에 호출되는 친구.
    //UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpid],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야.
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpid,
      ]);

      // 3. 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만든다.
      // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서.
      if (!previousLpPost) return;
      const newLpPost = { ...previousLpPost };

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야한다.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpid } as Likes; // 오타 수정: 타입 캐스팅 제거 및 객체 리터럴 사용
        previousLpPost?.data.likes.push(newLike);
      }

      //업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게 하면 내가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다.
      queryClient.setQueryData<ResponseLpDto>(
        [QUERY_KEY.lps, lp.lpid],
        newLpPost
      );

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpid],
        context?.previousLpPost
      );
    },

    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpid],
      });
    },
  });
}

export default useDeleteLike;
