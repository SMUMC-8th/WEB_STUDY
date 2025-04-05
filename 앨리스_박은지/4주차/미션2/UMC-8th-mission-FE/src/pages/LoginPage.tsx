import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { validateSignin, UserSigninInformation } from "../utils/validate";
import { postSignin } from "../apis/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const { errors, touched, getInputProps, handleSubmit } =
    useForm<UserSigninInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
      onSubmit: async (values) => {
        console.log("로그인 성공:", values);
        try {
          const response = await postSignin(values);
          if (response.status && response.data) {
            localStorage.setItem(
              LOCAL_STORAGE_KEY.accessToken,
              response.data.accessToken
            );
            localStorage.setItem("refreshToken", response.data.refreshToken);
            navigate("/");
          } else {
            alert(response.message || "로그인에 실패했습니다.");
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMessage =
              error.response?.data?.message || "로그인에 실패했습니다.";
            alert(errorMessage);
          } else {
            alert("알 수 없는 오류가 발생했습니다.");
          }
        }
      },
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center mb-8">
          <Link to="/" className="absolute left-0 text-3xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl font-bold w-full text-center">로그인</h1>
        </div>
        <button className="w-full bg-white text-black rounded-md py-3 mb-6 flex items-center justify-center space-x-2">
          <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          <span>구글 로그인</span>
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-4 text-sm text-gray-400">OR</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              {...getInputProps("email")}
              type="email"
              placeholder="이메일을 입력해주세요!"
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors?.email && touched?.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <input
              {...getInputProps("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors?.password && touched?.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white rounded-md py-3 font-medium hover:bg-gray-800"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
