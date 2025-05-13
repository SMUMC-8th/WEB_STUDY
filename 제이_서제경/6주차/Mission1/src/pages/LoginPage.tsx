// 로그인에 사용할 타입(email,password)과 유효성 검사 함수 불러오기
import { UserSigninInformation, validateSignin } from "../utils/vaildate";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, accessToken } = useAuth(); // 인증 관련 함수와 토큰 상태 가져오기
  const navigate = useNavigate(); // 페이지 이동에 사용

  // 이메일과 비밀번호 입력값 및 유효성 검사 관리
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin, // 입력할 때마다 유효성 검사 수행
    });

  // 로그인 버튼 클릭 시 실행되는 함수 -> 로그인하면 mypage로 이동
  const handleSubmit = async () => {
    try {
      await login(values); // 로그인 요청
      navigate("mypage"); // 로그인 성공 시 마이페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // 구글 로그인 버튼 클릭 시 실행 (서버에서 구글 로그인 시작 URL로 리디렉션)
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // 입력값이 비었거나 에러가 있으면 true를 반환 => 로그인 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 유효성 검사 에러 존재 여부
    Object.values(values).some((value) => value === ""); // 비어 있는 입력값 존재 여부

  return (
    // 전체 화면 가운데 정렬, 검은배경 적용
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* 로그인 박스 컨테이너 */}
      <div className="bg-black p-8 rounded-lg shadow-md w-[350px] text-white flex flex-col gap-4">
        {/* 상단 : 뒤로 가기 버튼 + '로그인' 타이틀*/}
        <div className="relative flex items-center justify-center">
          {/* 뒤로 가기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className="absolute font-medium left-0 text-white hover:text-gray-400"
          >
            &lt;
          </button>
          {/* 로그인 타이틀 */}
          <h2 className="text-2xl">로그인</h2>
        </div>

        {/* 구글 로그인 버튼 (아이콘 포함, 기능은 아직 없음) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-black text-white border-1 font-medium py-2 rounded-md flex justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        {/* 'OR' 구분선 */}
        <div className="flex items-center gap-4 text-white">
          <div className="flex-1 h-px bg-white" />
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-white" />
        </div>

        {/* 이메일 입력창 */}
        <input
          {...getInputProps("email")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.email && touched?.email ? "border-red-500" : "border-white"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {/* 이메일 유효성 에러 메시지 (사용자가 건드렸고 에러가 있을 때만 보여줌) */}
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        {/* 비밀번호 입력창 */}
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
        {/* 비밀번호 유효성 에러 메시지 */}
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit} // 클릭 시 로그인 요청
          disabled={isDisabled} // 입력값 미완성 or 에러 시 비활성화
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed opacity-50" // 비활성화 상태
              : "bg-gray-500 hover:bg-gray-600" // 활성화 상태
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
