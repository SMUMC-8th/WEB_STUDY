import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, UserSigninInformation } from "../utills/validate";
import { postSignin } from "../apis/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
export default function Login() {
  const { setItem } = useLocalStorage("accessToken");
  const navigate = useNavigate(); //페이지 이동 훅

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  //이메일 & 비밀번호 유효성 체크
  const isValid =
    !errors.email && !errors.password && values.email && values.password;

  //로그인 버튼 클릭 시 값 출력
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
      if (response.statusCode === 201) {
        navigate("/my");
      }
    } catch (error) {
      alert(error?.message);
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
      <div className="p-[10px] rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-xl">
            {"<"}
          </button>
          <p className="text-3xl font-bold">로그인</p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-[300px] p-3 rounded-md transition-colors ${
              isValid
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
