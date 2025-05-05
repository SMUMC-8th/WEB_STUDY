export type UserSigninInfo = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
};

function validateUser(values: UserSigninInfo) {
  const errors = {
    email: "",
    password: "",
    checkPassword: "",
    nickname: "",
  };
  const regexEmail = /^[a-z][a-z0-9]*@[a-z0-9]+\.[a-z]{2,}$/;
  const regexNick = /^[a-zA-Z가-힣0-9]{2,16}$/;

  if (!regexEmail.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!(8 <= values.password.length && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  if (values.password !== values.checkPassword) {
    errors.checkPassword = "비밀번호가 일치하지 않습니다.";
  }

  if (!regexNick.test(values.nickname)) {
    errors.nickname = "2~16자, 한글/영어/숫자로만 입력해주세요.";
  }

  return errors;
}

export function validateSignin(values: UserSigninInfo) {
  return validateUser(values);
}
