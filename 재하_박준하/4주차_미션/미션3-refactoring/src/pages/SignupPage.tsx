import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupFirstStep from "../components/SignupFirstStep";
import SignupSecondStep from "../components/SignupSecondStep";
import SignupThirdStep from "../components/SignupThirdStep";
import SignupDone from "../components/SingupDone";
import { useFormContext } from "react-hook-form";

type Step = 1 | 2 | 3 | 4;

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  function isDisabled(): boolean {
    if (currentStep === 1 && !errors.email && watch("email")) return false;
    else if (
      currentStep === 2 &&
      !errors.password &&
      watch("password") &&
      watch("password") === watch("checkPassword")
    )
      return false;
    else if (currentStep === 3 && !errors.nickname && watch("nickname"))
      return false;
    else if (currentStep === 4) return false;
    else return true;
  }

  const currentStepRender = () => {
    if (currentStep === 1) return <SignupFirstStep />;
    else if (currentStep === 2) return <SignupSecondStep />;
    else if (currentStep === 3) return <SignupThirdStep />;
    else return <SignupDone />;
  };

  const changeStep = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
    else if (currentStep === 3) setCurrentStep(4);
    else navigate("/signin");
  };

  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <section className="w-[300px] flex flex-col text-white text-center">
          {/* 뒤로가기 + 로그인 텍스트 */}
          <div className="relative mb-8 flex justify-center items-center">
            <button
              onClick={() => navigate(-1)}
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
            {currentStep !== 3 ? "다음" : "회원가입 완료"}
          </button>
        </section>
      </main>
    </>
  );
}
