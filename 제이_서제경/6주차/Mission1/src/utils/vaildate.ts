import { z } from "zod";

// 사용자 로그인 시 입력받는 정보 타입 정의 (email, password 필드 포함)
export type UserSigninInformation = {
  email: string;
  password: string;
};

// 사용자 로그인 입력값 유효성 검사 함수
function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  // 이메일 형식 정규식 검사 (올바른 이메일이 아니면 오류 메시지 설정)
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 비밀번호 길이 검사 (8자 이상 20자 이하만 허용)
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  // 에러 메시지 객체 반환 (문제가 없으면 빈 문자열이 유지됨)
  return errors;
}

// validateSignin 함수는 validateUser 함수를 그대로 재사용함
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}
export { validateSignin };

// 실제로 사용자가 폼에 입력한 데이터를 실행 중에 계속 검사하는 로직임
// -> TPostLP type선언한거랑 유효성 검사를 하는 Zod 스키마를 맞춰야 함
const addLpSchema = z.object({
  // 문자열 최소 1자 이상
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),

  // string | null → 두 타입 모두 허용
  thumbnail: z.union([
    z.string().url("유효한 이미지 URL이 아닙니다."),
    z.null(),
  ]),

  // 문자열 배열 (비어 있으면 안 됨)
  tags: z.array(z.string()).min(1, "태그를 하나 이상 입력해주세요."),

  // boolean
  published: z.boolean(),
});
export default addLpSchema;
