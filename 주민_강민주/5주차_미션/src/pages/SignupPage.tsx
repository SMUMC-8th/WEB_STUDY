import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "../components/Divider";
import GoogleLoginButton from "../components/GoogleLoginButton";
import SignupHeader from "../components/SignupHeader";
import SignupPasswordStep from "../components/SignupPasswordStep";
import SignupProfileStep from "../components/SignupProfileStep";
import { postSignup } from "../apis/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식을 입력해주세요."),
});

type EmailFormData = z.infer<typeof emailSchema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  // const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const email = watch("email");

  const handleEmailSubmit = (data: EmailFormData) => {
    console.log("입력한 이메일: ", data.email);
    setSavedEmail(data.email);
    setStep(2);
  };

  const handlePasswordComplete = (password: string) => {
    setSavedPassword(password);
    setStep(3);
  };

  const handleProfileComplete = async (nickname: string) => {
    // setNickname(nickname);
    console.log("최종 가입 정보:", {
      email: savedEmail,
      password: savedPassword,
      name: nickname,
    });

    const finalSignupData={
      email: savedEmail,
      password: savedPassword,
      name: nickname,
    };

    console.log("전송 데이터", JSON.stringify(finalSignupData));

    try{
      const response=await postSignup(finalSignupData);
      console.log("회원가입 성공:", response);

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Signup Error:", error);
        const serverMessage = error.response?.data?.message || "회원가입 실패";
        alert(serverMessage);
      }
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <SignupHeader title="회원가입" />

        {step === 1 && (
          <form onSubmit={handleSubmit(handleEmailSubmit)} className="flex flex-col gap-3">
            <GoogleLoginButton />
            <Divider />
            <input
              {...register("email")}
              className="text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
              type="email"
              placeholder="이메일을 입력해주세요!"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            <button
              type="submit"
              disabled={!isValid || !email}
              className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-300"
            >
              다음
            </button>
          </form>
        )}

        {step === 2 && (
          <SignupPasswordStep
            email={savedEmail}
            onComplete={handlePasswordComplete}
          />
        )}

        {step === 3 && <SignupProfileStep onComplete={handleProfileComplete} />}
      </div>
    </div>
  );
};

export default SignupPage;
