import { UserSigninInformation, validateSignin } from "../utils/vaildate";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStoage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response); // 여기 안으로!
      // 로그인 성공 시 페이지 이동 등도 추가할 수 있어
      navigate("/mypage"); // 예: 로그인 후 마이페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded-lg shadow-md w-[350px] text-white flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute font-medium left-0 text-white hover:text-gray-400"
          >
            &lt;
          </button>

          <h2 className="text-2xl">로그인</h2>
        </div>

        <button className="bg-black text-white border-1 font-medium py-2 rounded-md flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        <div className="flex items-center gap-4 text-white">
          <div className="flex-1 h-px bg-white" />
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-white" />
        </div>

        <input
          {...getInputProps("email")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.email && touched?.email ? "border-red-500" : "border-white"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.password && touched?.password
              ? "border-red-500"
              : "border-white"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
