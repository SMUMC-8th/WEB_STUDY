export type UserSigninInformation = {
  email: string;
  password: string;
};

export type SignupForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export function validateSignin(
  values: UserSigninInformation
): Partial<UserSigninInformation> {
  const errors: Partial<UserSigninInformation> = {};

  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요";
  }

  return errors;
}

export function validateSignupPassword(
  values: SignupForm
): Partial<SignupForm> {
  const errors: Partial<SignupForm> = {};

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "비밀번호를 다시 입력해주세요";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다";
  }

  return errors;
}

export function validateSignupNickname(
  values: Pick<SignupForm, "nickname">
): Partial<Pick<SignupForm, "nickname">> {
  const errors: Partial<Pick<SignupForm, "nickname">> = {};

  if (!values.nickname) {
    errors.nickname = "닉네임을 입력해주세요";
  } else if (values.nickname.length < 2 || values.nickname.length > 10) {
    errors.nickname = "닉네임은 2자 이상 10자 이하로 입력해주세요";
  }

  return errors;
}
