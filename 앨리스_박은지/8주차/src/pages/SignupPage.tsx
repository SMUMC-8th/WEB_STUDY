import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { AxiosError } from "axios";
import { SignupForm, signupSchema } from "../utils/schema";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    console.log("회원가입 성공:", data);
    try {
      const response = await postSignup({
        email: data.email,
        password: data.password,
        name: data.nickname,
      });

      if (response) {
        setIsComplete(true);
      } else alert("회원가입에 실패했습니다.");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "회원가입에 실패했습니다.");
      } else alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center mb-8">
          <Link to="/" className="absolute left-0 text-3xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl font-bold w-full text-center">회원가입</h1>
        </div>

        {!isComplete ? (
          <>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="이메일을 입력해주세요!"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요!"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("passwordConfirm")}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswordConfirm ? "👁️" : "👁️‍🗨️"}
                </button>
                {errors.passwordConfirm && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.passwordConfirm.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  {...register("nickname")}
                  type="text"
                  placeholder="닉네임을 입력해주세요!"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {errors.nickname && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.nickname.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white rounded-md py-3 font-medium hover:bg-pink-600"
              >
                회원가입
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold">회원가입 완료!</h2>
            <Link
              to="/login"
              className="block w-full bg-gray-900 text-white rounded-md py-3 font-medium hover:bg-gray-800"
            >
              로그인하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
