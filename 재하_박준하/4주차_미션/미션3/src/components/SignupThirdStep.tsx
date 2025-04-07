import defaultImage from "../assets/images/default-image.avif";
import { useSignup } from "../context/SignupContext";
import SigninForm from "./SiginForm";

export default function SignupThirdStep() {
  const { errors, touched, getInputOption } = useSignup();

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          className="w-[180px] mb-6 aspect-square rounded-full"
          src={defaultImage}
        ></img>
      </div>
      <SigninForm
        type="text"
        addClass="mb-4"
        placehorder="닉네임을 입력해주세요!"
        error={errors?.nickname}
        touched={touched?.nickname}
        getInputOption={getInputOption("nickname")}
      />
    </>
  );
}
