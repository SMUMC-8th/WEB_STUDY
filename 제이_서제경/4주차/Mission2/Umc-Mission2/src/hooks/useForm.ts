// 입력값 상태 관리, 유효성 검사, 에러 표시 조건 처리를 한 번에 해주는 폼 전용 커스텀 훅.

// React 관련 훅과 타입 import
import { ChangeEvent, useEffect, useState } from "react";

// useForm에 넘길 props의 타입 정의 (제네릭 T를 사용)
interface UseFormProps<T> {
  initialValue: T; // 초기값 객체 (예: { email: "", password: "" })
  validate: (values: T) => Record<keyof T, string>; // 유효성 검사 함수
}

// 제네릭 T를 받아서 어떤 폼이든 재사용 가능하도록 함
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue); // 현재 입력된 값

  const [touched, setTouched] = useState<Record<string, boolean>>(); // 각 필드를 사용자가 건드렸는지 여부

  const [errors, setErrors] = useState<Record<string, string>>(); // 각 필드의 에러 메시지

  // 사용자가 입력값을 변경할 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 기존 값 유지
      [name]: text, // 해당 name 필드만 업데이트
    });
  };

  // 사용자가 입력창에서 포커스를 잃었을 때 호출되는 함수
  // 포커스를 잃다 = 사용하자 다른 input이나 화면의 다른곳으로 이동해서 input 커서가 사라지는 것
  // 목적 : 처음부터 에러가 아니라 건드린 적이 있을 때 에러 메시지 보여주기 위해서
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched, // 기존에 건드린 필드는 그대로 두고
      [name]: true, // 현재 건드린 필드만 true로 표시함
    });
  };

  // 이메일, 비밀번호 등의 input 요소에 연결할 props를 만들어주는 함수
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name]; // 현재 해당 필드의 입력값을 가져옴
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value); // 입력값이 바뀌면 handleChange 실행

    const onBlur = () => handleBlur(name); // 포커스를 잃었을 때 handleBlur 실행

    return { value, onChange, onBlur }; // input에 바로 spread로 넣을 수 있음 => 객체 안의 속성들을 한꺼번에 컴포넌트 props로 넘겨준다.
  };

  //values가 변경될 때마다 유효성 검사 함수(validate)를 실행한다. = 자동검사기
  useEffect(() => {
    const newErrors = validate(values); // 현재 입력값을 기준으로 에러 체크
    setErrors(newErrors); // 검사 결과를 errors 상태에 저장
  }, [validate, values]); // values 또는 validate 함수가 바뀔 때마다 실행됨

  return { values, errors, touched, getInputProps };
}

export default useForm;
