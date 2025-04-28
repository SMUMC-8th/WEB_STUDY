import icon from "../assets/images/googleIcon.png";
import InputForm from "./InputForm";

export default function SignupFirstStep() {
  return (
    <>
      {/* 구글 로그인 버튼 미구현 */}
      <button className="block relative p-3 flex justify-center items-center border border-gray-400 rounded-sm">
        <img src={icon} className="inline w-[25px] absolute left-2" />
        <p className="">구글 로그인</p>
      </button>
      {/* 구분선  */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t bg-white"></div>
        <span className="px-10">OR</span>
        <div className="flex-1 border-t bg-white"></div>
      </div>
      {/* Email 입력 input tag */}
      <InputForm
        formName="email"
        type="email"
        addClass="mb-4 border border-gray-400"
        placehorder="이메일을 입력해주세요!"
      />
    </>
  );
}
