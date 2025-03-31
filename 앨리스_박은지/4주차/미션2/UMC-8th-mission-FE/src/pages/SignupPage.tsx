import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  emailSchema,
  passwordSchema,
  nicknameSchema,
  EmailForm,
  PasswordForm,
  NicknameForm,
} from "../utils/schema";

function SignupPage() {
  const [step, setStep] = useLocalStorage("signup_step", 1);
  const [email, setEmail] = useLocalStorage("signup_email", "");
  const [password, setPassword] = useLocalStorage("signup_password", "");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isComplete, setIsComplete] = useLocalStorage("signup_complete", false);
  const [nickname, setNickname] = useLocalStorage("signup_nickname", "");

  // Step 1: Email Form
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email,
    },
  });

  // Step 2: Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch: watchPassword,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      email,
      password,
      passwordConfirm: password,
    },
  });

  // Step 3: Nickname Form
  const {
    register: registerNickname,
    handleSubmit: handleNicknameSubmit,
    formState: { errors: nicknameErrors },
    watch: watchNickname,
  } = useForm<NicknameForm>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
    defaultValues: {
      email,
      password,
      nickname,
    },
  });

  const onEmailSubmit = (data: EmailForm) => {
    setEmail(data.email);
    setStep(2);
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    setPassword(data.password);
    setStep(3);
  };

  const onNicknameSubmit = async (data: NicknameForm) => {
    try {
      // TODO: API 호출
      console.log({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });
      setNickname(data.nickname);
      setIsComplete(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-4">
      <div>
        <input
          {...registerEmail("email")}
          type="email"
          placeholder="이메일을 입력해주세요!"
          className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {emailErrors.email && (
          <div className="text-red-500 text-sm mt-1">
            {emailErrors.email.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-900 text-white rounded-md py-3 font-medium hover:bg-gray-800"
      >
        다음
      </button>
    </form>
  );

  const renderStep2 = () => (
    <>
      <div className="mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white">
          {email}
        </div>
      </div>
      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className="space-y-4"
      >
        <div className="relative">
          <input
            {...registerPassword("password")}
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
          {passwordErrors.password && (
            <div className="text-red-500 text-sm mt-1">
              {passwordErrors.password.message}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            {...registerPassword("passwordConfirm")}
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
          {passwordErrors.passwordConfirm && (
            <div className="text-red-500 text-sm mt-1">
              {passwordErrors.passwordConfirm.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={
            !watchPassword("password") ||
            !watchPassword("passwordConfirm") ||
            Object.keys(passwordErrors).length > 0
          }
          className={`w-full rounded-md py-3 font-medium ${
            !watchPassword("password") ||
            !watchPassword("passwordConfirm") ||
            Object.keys(passwordErrors).length > 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          다음
        </button>
      </form>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="mb-6 space-y-2">
        <div className="bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white">
          {email}
        </div>
      </div>
      <form
        onSubmit={handleNicknameSubmit(onNicknameSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            {...registerNickname("nickname")}
            type="text"
            placeholder="닉네임을 입력해주세요!"
            className="w-full bg-gray-900 border border-gray-800 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {nicknameErrors.nickname && (
            <div className="text-red-500 text-sm mt-1">
              {nicknameErrors.nickname.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={
            !watchNickname("nickname") || Object.keys(nicknameErrors).length > 0
          }
          className={`w-full rounded-md py-3 font-medium ${
            !watchNickname("nickname") || Object.keys(nicknameErrors).length > 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          회원가입 완료
        </button>
      </form>
    </>
  );

  const handleReset = () => {
    setStep(1);
    setEmail("");
    setPassword("");
    setNickname("");
    setIsComplete(false);
    window.localStorage.removeItem("signup_step");
    window.localStorage.removeItem("signup_email");
    window.localStorage.removeItem("signup_password");
    window.localStorage.removeItem("signup_nickname");
    window.localStorage.removeItem("signup_complete");
  };

  const renderComplete = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 mx-auto bg-gray-900 rounded-full flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>
      <h2 className="text-2xl font-bold">회원가입 완료!</h2>
      <p className="text-gray-400">{nickname}님, 환영합니다!</p>
      <Link
        to="/login"
        onClick={handleReset}
        className="block w-full bg-gray-900 text-white rounded-md py-3 font-medium hover:bg-gray-800"
      >
        로그인하기
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md">
        <div className="relative flex items-center mb-8">
          {!isComplete && step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute left-0 text-3xl font-bold"
            >
              &lt;
            </button>
          )}
          {!isComplete && step === 1 && (
            <Link to="/" className="absolute left-0 text-3xl font-bold">
              &lt;
            </Link>
          )}
          <h1 className="text-2xl font-bold w-full text-center">회원가입</h1>
        </div>
        {!isComplete && step === 1 && (
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
          </>
        )}
        {isComplete
          ? renderComplete()
          : step === 1
          ? renderStep1()
          : step === 2
          ? renderStep2()
          : renderStep3()}
      </div>
    </div>
  );
}

export default SignupPage;
