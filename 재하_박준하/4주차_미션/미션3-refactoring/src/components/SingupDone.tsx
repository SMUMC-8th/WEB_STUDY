import axios from "axios";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { umcServer } from "../utils/axiosInfo";
import Loading from "./Loading";

export default function SignupDone() {
  const [isFetching, setIsFecthing] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { watch, reset } = useFormContext();

  async function postSignup() {
    try {
      setIsFecthing(true);
      await umcServer.post("/v1/auth/signup", {
        name: watch("nickname"),
        email: watch("email"),
        password: watch("password"),
      });

      setIsLoading(false);
      reset();
    } catch (err: unknown) {
      if (!axios.isCancel(err)) {
        setError(axios.isAxiosError(err) ? err.response?.status || 500 : 500);
        setIsLoading(false);
        reset();
      }
    }
  }

  if (!isFetching) postSignup();

  if (error)
    return (
      <>
        <h1 className="mb-6 text-6xl font-bold text-white">{error}</h1>
        <p className="m-6 text-2xl text-white">에러가 발생했습니다.🥲</p>
      </>
    );

  if (isLoading) return <Loading />;

  return (
    <p className="mb-4 text-3xl text-center whitespace-pre">
      {`회원가입을\n축하드립니다!\n🎉🎉🎉`}
    </p>
  );
}
