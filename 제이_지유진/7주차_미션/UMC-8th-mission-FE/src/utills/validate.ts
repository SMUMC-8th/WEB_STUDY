import { z } from "zod";

export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바를 이메일 형식이 아닙니다!";
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8-20자 사이로 입력해주세요.";
  }

  return errors;
}

const addLpSchema = z.object({
  title: z.string().nonempty("제목을 입력해주세요."),
  content: z.string().nonempty("내용을 입력해주세요."),
});

function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin, addLpSchema };
