import { useSignup } from "../context/SignupContext";
import SigninForm from "./SiginForm";

export default function SignupSecondStep() {
  const { values, errors, touched, getInputOption } = useSignup();

  return (
    <>
      {/* 이전에 입력한 Email 출력 */}
      <p className="mb-4 text-left text-lg whitespace-pre">
        {`✉️   ${values.email}`}
      </p>
      {/* Password 입력 input tag */}
      <SigninForm
        type="password"
        addClass="mb-4"
        placehorder="비밀번호를 입력해주세요!"
        error={errors?.password}
        touched={touched?.password}
        getInputOption={getInputOption("password")}
      />
      <SigninForm
        type="password"
        addClass="mb-4"
        placehorder="비밀번호를 다시 한 번 입력해주세요!"
        error={errors?.checkPassword}
        touched={touched?.checkPassword}
        getInputOption={getInputOption("checkPassword")}
      />
    </>
  );
}
