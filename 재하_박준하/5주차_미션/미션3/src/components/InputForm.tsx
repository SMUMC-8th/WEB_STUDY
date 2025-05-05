import openEye from "../assets/images/openEyes.png";
import closeEye from "../assets/images/closeEyes.png";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SignupFormValues } from "../context/SignupFormContext";

interface props {
  formName: "email" | "password" | "checkPassword" | "nickname";
  type: string;
  addClass: string;
  placehorder: string;
}

export default function InputForm({
  formName,
  type,
  addClass,
  placehorder,
}: props) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<SignupFormValues>();
  const [inputTagType, setInputType] = useState<string>(type);
  const showError = errors[formName] && touchedFields[formName];

  function renderPasswordToggle() {
    if (type !== "password") return null;

    const passwordToggle = () => {
      setInputType(inputTagType === "text" ? "password" : "text");
    };

    const eyeType = inputTagType === "text" ? openEye : closeEye;

    return (
      <button
        type="button"
        onClick={passwordToggle}
        className="p-2 flex items-center rounded-md hover:bg-gray-700"
      >
        <img className="h-[25px]" src={eyeType} />️
      </button>
    );
  }

  return (
    <>
      {/* 입력 Input tag */}
      <form className={`flex rounded-md bg-zinc-900 ${addClass}`}>
        <input
          type={inputTagType}
          {...register(formName)}
          className={`block p-2 flex-grow-1 rounded-md  ${
            showError ? "bg-red-500" : "bg-zinc-900"
          } `}
          placeholder={placehorder}
        ></input>
        {renderPasswordToggle()}
      </form>
      {/* error text tag */}
      <p className={`text-red-500 mb-4 ${showError ? "" : "hidden"}`}>
        {errors[formName]?.message}
      </p>
    </>
  );
}
