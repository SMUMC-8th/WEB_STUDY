import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

export default function usePatchMyInfo() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (newProfile) => {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: newProfile.name,
              bio: newProfile.bio,
              avatar: newProfile.avatar,
            }
          : {
              name: newProfile.name,
              bio: newProfile.bio,
              avatar: newProfile.avatar,
            }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}
