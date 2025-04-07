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
  return (
    <>
      {/* 입력 Input tag */}
      <input
        type={type}
        {...getInputOption}
        className={`block p-2 border border-gray-400 rounded-sm  ${
          error && touched ? "bg-red-500" : "bg-zinc-900"
        } ${addClass}`}
        placeholder={placehorder}
      ></input>
      {/* error text tag */}
      <p className={`text-red-500 mb-4 ${error && touched ? "" : "hidden"}`}>
        {error}
      </p>
    </>
  );
}
