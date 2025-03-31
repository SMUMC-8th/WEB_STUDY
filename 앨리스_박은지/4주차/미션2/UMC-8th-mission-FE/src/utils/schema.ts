import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

export const passwordSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요")
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해주세요")
      .max(20, "비밀번호는 8자 이상 20자 이하로 입력해주세요"),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export const nicknameSchema = z.object({
  email: z.string(),
  password: z.string(),
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요")
    .min(2, "닉네임은 2자 이상 10자 이하로 입력해주세요")
    .max(10, "닉네임은 2자 이상 10자 이하로 입력해주세요"),
});

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type NicknameForm = z.infer<typeof nicknameSchema>;
