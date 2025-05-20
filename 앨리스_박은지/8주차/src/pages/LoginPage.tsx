import { validateSignin, UserSigninInformation } from "../utils/validate";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postSignin } from "../apis/auth";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const { accessToken, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<UserSigninInformation>>({});

  useEffect(() => {
    if (accessToken) {
      navigate("/my-page", { replace: true });
    }
  }, [accessToken, navigate]);

  const loginMutation = useMutation({
    mutationFn: async (values: UserSigninInformation) => {
      const response = await postSignin(values);

      return response;
    },
    onSuccess: async (response) => {
      if (response && response.data) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        navigate("/my-page", { replace: true });
      } else {
        throw new Error("로그인 응답이 올바르지 않습니다");
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "로그인에 실패했습니다.";
        alert(errorMessage);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateSignin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await loginMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_GOOGLE_LOGIN_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center mb-8">
          <Link to="/" className="absolute left-0 text-3xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl font-bold w-full text-center">로그인</h1>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black rounded-md py-3 mb-6 flex items-center justify-center space-x-2"
        >
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요!"
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력해주세요!"
              className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white rounded-md py-3 hover:bg-pink-600 transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
