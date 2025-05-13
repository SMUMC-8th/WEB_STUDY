import { ChangeEvent, useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name as string]: true,
    });

    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };
//values가 변경될 때마다 에러 검증 로직이 실행됨
//{email: ""}
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); //오류메세지 업댓
  }, [validate, values]);
  
  return {values, errors, touched, getInputProps};

}

export default useForm;
