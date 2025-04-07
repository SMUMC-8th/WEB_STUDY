// 로그인에 사용할 타입(email,password)과 유효성 검사 함수 불러오기
import { UserSigninInformation, validateSignin } from "../utils/vaildate";
import useForm from "../hooks/useForm"; // 커스텀 훅: 폼 상태 관리용
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router훅
import { postSignin } from "../apis/auth"; // 로그인 API 요청 함수(백엔드에 email, password를 보내서 인증 요청)
import { useLocalStorage } from "../hooks/useLocalStoage"; // 커스텀 훅: 로컬스토리지 관리용
import { LOCAL_STORAGE_KEY } from "../constants/key"; // 로컬스토리지 키들을 상수로 관리(오타방지+일관성 유지)

const LoginPage = () => {
  // "accessToken"이라는 key로 값을 저장하는 함수 setItem을 준비함
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate(); // 페이지를 이동할 수 있는 함수 선언

  // 폼 상태 관리 훅 사용 (초기값과 유효성 검사 함수 전달)
  // values: 현재 입력된 값 / error: 각 필드의 에러 메시지
  // touched: 사용자가 한 번 이상 건드린 필드인지 기록 / getInputProps : input 태그에 넣을 props
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      // 각 input의 초기값 설정
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin, //사용자가 입력할 때마다 호출되는 검사 함수
    });

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    try {
      const response = await postSignin(values); // 로그인 요청(백엔드에 로그인 요청 보냄)
      setItem(response.data.accessToken); // 로그인에 성공하면 백에서 accessToken 응답으로 보내줌 -> 이걸 로컬스토리지에 저장
      navigate("/mypage"); // 로그인 성공 시 마이페이지로 이동
    } catch (error: unknown) {
      // 에러 핸들링
      if (error instanceof Error) {
        alert(error.message); // 에러 메시지 출력
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  // 입력값이 비었거나 에러가 있으면 true를 반환 => 로그인 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

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
        <button className="bg-black text-white border-1 font-medium py-2 rounded-md flex items-center justify-center gap-2">
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
