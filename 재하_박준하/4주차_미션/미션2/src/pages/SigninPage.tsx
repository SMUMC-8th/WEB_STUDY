import useCustomForm from "../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/googleIcon.png";
import { UserSigninInfo, validateSignin } from "../utils/validate";
import SigninForm from "../components/SiginForm";

export default function SigninPage() {
  const navigate = useNavigate();
  const { errors, touched, getInputOption } = useCustomForm<UserSigninInfo>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  function goBack() {
    navigate(-1);
  }

  function isDisabled(): boolean {
    if (errors?.email.length === 0 && errors?.password.length === 0)
      return false;

    return true;
  }

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
            <p className="text-2xl">로그인</p>
          </div>
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
            addClass=""
            placehorder="이메일을 입력해주세요!"
            error={errors?.email}
            touched={touched?.email}
            getInputOption={getInputOption("email")}
          />
          {/* Password 입력 input tag */}
          <SigninForm
            type="password"
            addClass="my-4"
            placehorder="비밀번호를 입력해주세요!"
            error={errors?.password}
            touched={touched?.password}
            getInputOption={getInputOption("password")}
          />
          {/* 로그인 버튼 ( 조건 만족 시 활성화 ) */}
          <button
            disabled={isDisabled()}
            className={`block p-2 border border-gray-400 rounded-sm bg-pink-500 hover:bg-pink-700 disabled:bg-zinc-900`}
          >
            로그인
          </button>
        </section>
      </main>
    </>
  );
}
