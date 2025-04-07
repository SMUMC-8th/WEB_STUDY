import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupFirstStep from "../components/SignupFirstStep";
import SignupSecondStep from "../components/SignupSecondStep";
import { useSignup } from "../context/SignupContext";
import SignupThirdStep from "../components/SignupThirdStep";
import SignupDone from "../components/SingupDone";

type Step = "email" | "password" | "profile" | "finish";

export default function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const { errors } = useSignup();

  function goBack() {
    navigate(-1);
  }

  function isDisabled(): boolean {
    if (currentStep === "email" && errors?.email.length === 0) return false;
    else if (
      currentStep === "password" &&
      errors?.password.length === 0 &&
      errors?.checkPassword.length === 0
    )
      return false;
    else if (currentStep === "profile" && errors?.nickname.length === 0)
      return false;
    else if (currentStep === "finish") return false;
    else return true;
  }

  const currentStepRender = () => {
    if (currentStep === "email") return <SignupFirstStep />;
    else if (currentStep === "password") return <SignupSecondStep />;
    else if (currentStep === "profile") return <SignupThirdStep />;
    else return <SignupDone />;
  };

  const changeStep = () => {
    if (currentStep === "email") setCurrentStep("password");
    else if (currentStep === "password") setCurrentStep("profile");
    else if (currentStep === "profile") setCurrentStep("finish");
    else navigate("/signin");
  };

  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <section className="w-[300px] flex flex-col text-white text-center">
          {/* 뒤로가기 + 로그인 텍스트 */}
          <div className="relative mb-8 flex justify-center items-center">
            <button
              onClick={() => goBack()}
              className="absolute left-0 p-1 text-3xl hover:text-green-500"
            >{`<`}</button>
            <p className="text-2xl">회원가입</p>
          </div>
          {currentStepRender()}
          {/* 로그인 버튼 ( 조건 만족 시 활성화 ) */}
          <button
            disabled={isDisabled()}
            onClick={changeStep}
            className={`block p-2 rounded-sm bg-pink-500 hover:bg-pink-700 disabled:text-zinc-400 disabled:bg-zinc-900`}
          >
            {currentStep !== "profile" ? "다음" : "회원가입 완료"}
          </button>
        </section>
      </main>
    </>
  );
}
