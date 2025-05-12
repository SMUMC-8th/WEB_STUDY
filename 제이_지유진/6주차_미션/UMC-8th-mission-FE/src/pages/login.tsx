import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, UserSigninInformation } from "../utills/validate";
import { useAuth } from "../context/AuthContext.tsx";
import { useMutation } from "@tanstack/react-query";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); //페이지 이동
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  //이메일 & 비밀번호 유효성 체크
  const isValid =
    !errors.email && !errors.password && values.email && values.password;

  //로그인 버튼 클릭 시 값 출력
  // const handleSubmit = async () => {
  //   await login(values);
  //   navigate("/my");
  // };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // const { mutate: deleteLpMutate } = useMutation({
  //   mutationFn: () => deleteLp(Number(lpId)),
  //   onSuccess: () => {
  //     setLike(false);
  //     queryClient.invalidateQueries({ queryKey: ["getLPDetail"] }); // 좋아요 성공 후 쿼리 무효화
  //     navigate("/"); // 삭제 후 홈으로 이동
  //   }, // lpId를 숫자로 변환
  //   onError: (error) => {
  //     console.error("LP 삭제 실패:", error);
  //   },
  // }); 예시1

  const { mutate: LoginMutate } = useMutation({
    mutationFn: () => login(values),
    onSuccess: () => {
      navigate("/my");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  const handleSubmit = async () => {
    LoginMutate();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
      <div className="p-[10px] rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-xl">
            {"<"}
          </button>
          <p className="text-3xl font-bold">로그인</p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-[300px] p-3 rounded-md transition-colors ${
              isValid
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-[300px] p-3 rounded-md transition-colors bg-pink-500 text-white hover:bg-pink-600"
          >
            <div className="flex items-center justify-center">
              <img
                src={"../google.svg"}
                alt="google"
                className="w-5 h-5 inline-block mr-2"
              />
              구글 로그인
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
