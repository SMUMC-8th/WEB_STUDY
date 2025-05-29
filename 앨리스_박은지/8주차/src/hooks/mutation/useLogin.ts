import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";

function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postSignin({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export default useLogin;
