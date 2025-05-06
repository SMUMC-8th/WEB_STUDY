import { useNavigate } from "react-router-dom";
import icon from "../assets/images/googleIcon.png";
import InputForm from "../components/InputForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { umcServer } from "../utils/axiosInfo";
import { signinResponse } from "../types/ServerResponseType";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SigninPage() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    watch,
  } = useFormContext();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  // refreshToken 관리
  const [refreshToken, setRefreshToken] = useLocalStorage<string>(
    "refreshToken",
    ""
  );

  // 컴포넌트가 마운트시 토큰 확인
  useEffect(() => {
    checkExistingTokens();
  }, []);

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

  async function checkExistingTokens() {
    const accessToken = sessionStorage.getItem("accessToken");

    if (refreshToken && accessToken) {
      // 토큰이 모두 존재하는 경우
      navigate("/");
    } else if (refreshToken && !accessToken) {
      // refreshToken만 있는 경우
      // 새 accessToken 요청
      try {
        setIsFetching(true);
        const response = await umcServer.post("/v1/auth/token", {
          refreshToken: refreshToken,
        });

        if (response.data && response.data.accessToken) {
          sessionStorage.setItem("accessToken", response.data.accessToken);
          navigate("/");
        }
      } catch (err) {
        // 리프레시 토큰이 유효하지 않은 경우
        // 제거
        setRefreshToken("");
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    }
  }

  async function tryLogin() {
    try {
      setIsFetching(true);

      const { data }: { data: signinResponse } = await umcServer.post(
        `/v1/auth/signin`,
        {
          email: watch("email"),
          password: watch("password"),
        }
      );

      // 토큰 저장
      console.log(data);
      setRefreshToken(data.data.refreshToken);
      sessionStorage.setItem("accessToken", data.data.accessToken);

      setIsFetching(false);
      navigate("/");
    } catch (err: unknown) {
      if (!axios.isCancel(err)) {
        setStatusCode(
          axios.isAxiosError(err) ? err.response?.status || 500 : 500
        );
        setIsFetching(false);
      }
    }
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
              if (!isFetching) tryLogin();
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
