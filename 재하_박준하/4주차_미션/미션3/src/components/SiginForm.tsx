import openEye from "../assets/images/openEyes.png";
import closeEye from "../assets/images/closeEyes.png";
import { useState } from "react";

interface IgetInputOption {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

interface props {
  type: string;
  addClass: string;
  placehorder: string;
  error: string | undefined;
  touched: boolean | undefined;
  getInputOption: IgetInputOption;
}

export default function SigninForm({
  type,
  addClass,
  placehorder,
  error,
  touched,
  getInputOption,
}: props) {
  const [inputType, setInputType] = useState(type);
  const showError = error && touched;

  function renderPasswordToggle() {
    if (type !== "password") return null;

    const passwordToggle = () => {
      setInputType(inputType === "text" ? "password" : "text");
    };

    const eyeType = inputType === "text" ? openEye : closeEye;

    return (
      <button
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
      <div className={`flex rounded-md bg-zinc-900 ${addClass}`}>
        <input
          type={inputType}
          {...getInputOption}
          className={`block p-2 flex-grow-1 rounded-md  ${
            showError ? "bg-red-500" : "bg-zinc-900"
          } `}
          placeholder={placehorder}
        ></input>
        {renderPasswordToggle()}
      </div>
      {/* error text tag */}
      <p className={`text-red-500 mb-4 ${showError ? "" : "hidden"}`}>
        {error}
      </p>
    </>
  );
}
