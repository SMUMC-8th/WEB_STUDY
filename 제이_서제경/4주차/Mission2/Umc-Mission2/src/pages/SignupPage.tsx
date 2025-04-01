import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

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
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck: _, ...rest } = data;

    try {
      const response = await postSignup(data);
      alert("회원가입에 성공했습니다!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black p-8 rounded-lg shadow-md w-[350px] text-white flex flex-col gap-4"
      >
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="absolute font-medium left-0 text-white hover:text-gray-400"
          >
            &lt;
          </button>
          <h2 className="text-2xl">회원가입</h2>
        </div>

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

        <div className="flex items-center gap-4 text-white">
          <div className="flex-1 h-px bg-white" />
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-white" />
        </div>

        <input
          {...register("email")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.email ? "border-red-500" : "border-white"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.password ? "border-red-500" : "border-white"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`p-3 rounded-md bg-zinc-800 border text-sm text-white ${
            errors?.passwordCheck ? "border-red-500" : "border-white"
          }`}
          type="password"
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

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
