import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  email: string;
  onComplete: (password: string) => void;
};

const passwordSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const SignupPasswordStep = ({ email, onComplete }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode:"onChange",
  });

  const password=watch("password");
  const confirmPassword=watch("confirmPassword");

  const isDisabled=!isValid||!password||!confirmPassword;

  const onSubmit = (data: PasswordFormData) => {
    onComplete(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
        <span className="text-gray-400">📧</span>
        {email}
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[10px] pr-10 focus:border-[#807bff] rounded-sm"
          placeholder="비밀번호를 입력해주세요!"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? "🔓" : "🔒"}
        </button>
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
      </div>

      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          {...register("confirmPassword")}
          className="text-white bg-neutral-800 border border-[#ccc] w-[300px] p-[10px] pr-10 focus:border-[#807bff] rounded-sm"
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showConfirm ? "🔓" : "🔒"}
        </button>
        {errors.confirmPassword && (
          <div className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full py-3 rounded-md text-lg font-medium transition-colors
            ${isDisabled
            ? "bg-gray-400 cursor-not-allowed text-white" 
            : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
      >
        다음
      </button>
    </form>
  );
};

export default SignupPasswordStep;
