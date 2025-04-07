import icon from "../assets/images/googleIcon.png";
import { useSignup } from "../context/SignupContext";
import SigninForm from "./SiginForm";

export default function SignupFirstStep() {
  const { errors, touched, getInputOption } = useSignup();
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
      <SigninForm
        type="email"
        addClass="mb-4 border border-gray-400"
        placehorder="이메일을 입력해주세요!"
        error={errors?.email}
        touched={touched?.email}
        getInputOption={getInputOption("email")}
      />
    </>
  );
}
