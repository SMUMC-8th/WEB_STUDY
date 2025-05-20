import { useNavigate } from "react-router-dom";
import icon from "../assets/images/googleIcon.svg";
import InputForm from "../components/InputForm";
import { useState } from "react";
// import axios from "axios";
import { useFormContext } from "react-hook-form";
import { umcServerNoAuth } from "../utils/axiosInfo";
// import { signinResponse } from "../types/ServerResponseType";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function SigninPage() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    watch,
  } = useFormContext();
  // 중복 요청 방지
  // const [isFetching, setIsFetching] = useState<boolean>(false);
  // email, pwd error code
  const [statusCode, setStatusCode] = useState<number | null>(null);
  // login 성공시 해당 정보 알리기
  const { login } = useAuth();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: () =>
      umcServerNoAuth.post(`/v1/auth/signin`, {
        email: watch("email"),
        password: watch("password"),
      }),
    onSuccess: (data) => {
      // console.log(data.data.data);
      // console.log(data.data.data.refreshToken);
      // console.log(data.data.data.accessToken);
      //   // login 정보 저장
      //   // refreshToken, accessToken, etc.
      localStorage.setItem("refreshToken", data.data.data.refreshToken);
      sessionStorage.setItem("accessToken", data.data.data.accessToken);
      //   // login되었다고 set
      login();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    onSettled: () => {
      navigate("/");
    },
  });

  // email, password 유효성 검사
  function isDisabled(): boolean {
    if (
      watch("email").length > 0 &&
      watch("password").length > 0 &&
      !errors.email &&
      !errors.password
    )
      return false;
    else return true;
  }

  async function tryLogin() {
    loginMutate();
    // try {
    //   setIsFetching(true);
    //   const { data }: { data: signinResponse } = await umcServerNoAuth.post(
    //     `/v1/auth/signin`,
    //     {
    //       email: watch("email"),
    //       password: watch("password"),
    //     }
    //   );
    //   // login 정보 저장
    //   // refreshToken, accessToken, etc.
    //   localStorage.setItem("refreshToken", data.data.refreshToken);
    //   sessionStorage.setItem("accessToken", data.data.accessToken);
    //   // login되었다고 set
    //   login();
    //   setIsFetching(false);
    //   navigate("/");
    // } catch (err: unknown) {
    //   if (!axios.isCancel(err)) {
    //     setStatusCode(
    //       axios.isAxiosError(err) ? err.response?.status || 500 : 500
    //     );
    //     setIsFetching(false);
    //   }
    // }
  }

  async function loginGoogle() {
    window.location.href =
      import.meta.env.VITE_SERVER + "/v1/auth/google/login";
  }

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
            <p className="text-2xl">로그인</p>
          </div>
          {/* 구글 로그인 버튼 미구현 */}
          <button
            onClick={() => {
              if (!isPending) loginGoogle();
            }}
            className="block relative p-3 flex justify-center items-center border border-gray-400 rounded-sm bg-zinc-700 hover:bg-zinc-900"
          >
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
            addClass=""
            placehorder="이메일을 입력해주세요!"
          />
          {/* Password 입력 input tag */}
          <InputForm
            formName="password"
            type="password"
            addClass="my-4"
            placehorder="비밀번호를 입력해주세요!"
          />
          {/* 로그인 버튼 ( 조건 만족 시 활성화 ) */}
          <button
            disabled={isDisabled()}
            onClick={() => {
              if (!isPending) tryLogin();
            }}
            className={`block p-2 border border-gray-400 rounded-sm bg-pink-500 hover:bg-pink-700 disabled:bg-zinc-900`}
          >
            로그인
          </button>
          <p className={`mt-4 text-red-500 ${statusCode ? "" : "hidden"}`}>
            이메일 또는 비밀번호가 틀렸습니다.
          </p>
        </section>
      </main>
    </>
  );
}
