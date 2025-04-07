import { useState } from "react";
import { useSignup } from "../context/SignupContext";
import Loading from "./Loading";
import axios from "axios";

export default function SignupDone() {
  const [isFetching, setIsFecthing] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { values } = useSignup();

  async function postSignup() {
    try {
      setIsFecthing(true);
      await axios.post(
        "http://localhost:8000/v1/auth/signup",
        {
          name: values.nickname,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
    } catch (err: unknown) {
      if (!axios.isCancel(err)) {
        setError(axios.isAxiosError(err) ? err.response?.status || 500 : 500);
        setIsLoading(false);
      }
    }
  }

  if (!isFetching) postSignup();

  if (error)
    return (
      <>
        <h1 className="mb-6 text-6xl font-bold">{error}</h1>
        <p className="m-6 text-2xl">에러가 발생했습니다.🥲</p>
      </>
    );

  if (isLoading) return <Loading />;

  return (
    <p className="mb-4 text-3xl text-center whitespace-pre">
      {`회원가입을\n축하드립니다!\n🎉🎉🎉`}
    </p>
  );
}
