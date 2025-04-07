export type UserSigninInfo = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInfo) {
  const errors = {
    email: "",
    password: "",
  };
  const regexEmail = /^[a-z][a-z0-9]*@[a-z0-9]+\.[a-z]{2,}$/;

  if (!regexEmail.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!(8 <= values.password.length && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

export function validateSignin(values: UserSigninInfo) {
  return validateUser(values);
}
