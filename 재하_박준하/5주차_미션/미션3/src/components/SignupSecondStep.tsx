import { useFormContext } from "react-hook-form";
import InputForm from "./InputForm";

export default function SignupSecondStep() {
  const { watch } = useFormContext();
  return (
    <>
      {/* 이전에 입력한 Email 출력 */}
      <p className="mb-4 text-left text-lg whitespace-pre">
        {`✉️   ${watch("email")}`}
      </p>
      {/* Password 입력 input tag */}
      <InputForm
        formName="password"
        type="password"
        addClass="mb-4"
        placehorder="비밀번호를 입력해주세요!"
      />
      {/* checkPassword 입력 input tag */}
      <InputForm
        formName="checkPassword"
        type="password"
        addClass="mb-4"
        placehorder="비밀번호를 다시 한 번 입력해주세요!"
      />
    </>
  );
}
