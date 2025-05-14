import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
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
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
    if (response.statusCode === 201) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-white">
      <div className="p-[10px] rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-xl">
            {"<"}
          </button>
          <p className="text-3xl font-bold">회원가입</p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            {...register("email")}
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}

          <input
            {...register("passwordCheck")}
            type="password"
            placeholder="비밀번호 확인"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {errors.passwordCheck && (
            <div className="text-red-500 text-sm">
              {errors.passwordCheck.message}
            </div>
          )}

          <input
            {...register("name")}
            type="text"
            placeholder="이름을 입력해주세요!"
            className="w-[300px] p-3 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name.message}</div>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            className={`w-[300px] p-3 rounded-md transition-colors ${
              isValid
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
