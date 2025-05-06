import { useEffect, useState, ChangeEvent } from "react"; //이해 안됨..

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  // 객체 값 업데이트 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: text,
    }));
  };

  // 입력 필드가 포커스를 잃었을 때 호출
  const handleBlur = (name: keyof T) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  // 인풋 속성 반환
  const getInputProps = (name: keyof T) => ({
    value: values[name] as string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
  });

  // values가 변경될 때마다 에러 검증 로직 실행
  useEffect(() => {
    setErrors(validate(values));
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
