import { z } from "zod"; // Zod: 폼 유효성 검사 스키마를 정의하기 위한 라이브러리
import { zodResolver } from "@hookform/resolvers/zod"; // React Hook Form과 Zod 연결해주는 어댑터
import { useForm, SubmitHandler } from "react-hook-form"; // 폼 상태 관리 및 제출 핸들러 타입
import { postSignup } from "../apis/auth"; // 회원가입 API 요청 함수
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다. " }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다. " }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  // password와 passwordCheck가 같은지 검사 (같지 않으면 passwordCheck에 에러 표시)
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"], // 이 에러는 passwordCheck 필드에 표시됨
  });

// 스키마에서 타입을 추론해 FormFields 타입으로 사용
type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  const {
    register, // 각 input에 연결할 수 있는 함수 (onChange, onBlur 등 자동 연결됨)
    handleSubmit, // form 제출 시 실행되는 함수
    formState: { errors, isSubmitting }, // 에러 상태와 제출 중 상태를 가져옴
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema), // 유효성 검사 방식: zod 사용
    mode: "onBlur", // blur(포커스를 잃었을 때) 유효성 검사를 실행
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck: _, ...rest } = data; // passwordCheck는 서버에 보낼 필요 없으므로 제외

    try {
      const response = await postSignup(data); // API 호출
      alert("회원가입에 성공했습니다!");
      navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    // 전체 화면 가운데 정렬 + 배경 검정색
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* 회원가입 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)} // 폼 제출 시 onSubmit 실행
        className="bg-black p-8 rounded-lg shadow-md w-[350px] text-white flex flex-col gap-4"
      >
        <div className="relative flex items-center justify-center">
          {/* ← 버튼: 이전 페이지로 이동 */}
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="absolute font-medium left-0 text-white hover:text-gray-400"
          >
            &lt;
          </button>
          {/* 중앙 타이틀: 회원가입 */}
          <h2 className="text-2xl">회원가입</h2>
        </div>

        {/* 구글 로그인 버튼(기능은 아직 없음) */}
        <button
          type="button"
          className="bg-black text-white border-1 font-medium py-2 rounded-md flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>

        {/* 구분선 OR */}
        <div className="flex items-center gap-4 text-white">
          <div className="flex-1 h-px bg-white" />
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-white" />
        </div>

        {/* 이메일 입력 필드 */}
        <input
          {...register("email")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.email ? "border-red-500" : "border-white"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {/* 이메일 에러 메시지*/}
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        {/* 비밀번호 입력 필드*/}
        <input
          {...register("password")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.password ? "border-red-500" : "border-white"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {/* 에러 메시지*/}
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        {/* 비밀번호 확인 입력 필드*/}
        <input
          {...register("passwordCheck")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.passwordCheck ? "border-red-500" : "border-white"
          }`}
          type="password"
          placeholder="비밀번호 확인"
        />
        {/* 에러 메시지*/}
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        {/* 이름 입력 필드*/}
        <input
          {...register("name")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.name ? "border-red-500" : "border-white"
          }`}
          type="text"
          placeholder="이름을 입력해주세요!"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        {/* 회원가입 제출 버튼*/}
        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            isSubmitting
              ? "bg-gray-400 opacity-50"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
