import defaultImage from "../assets/images/default-image.avif";
import InputForm from "./InputForm";

export default function SignupThirdStep() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          className="w-[180px] mb-6 aspect-square rounded-full"
          src={defaultImage}
        ></img>
      </div>
      {/* nickname 입력 input tag */}
      <InputForm
        formName="nickname"
        type="text"
        addClass="mb-4"
        placehorder="닉네임을 입력해주세요!"
      />
    </>
  );
}
