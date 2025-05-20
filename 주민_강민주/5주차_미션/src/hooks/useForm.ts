import { useState, useEffect } from "react";

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Partial<T>;
  onSubmit?: (values: T) => void;
}

function useForm<T>({ initialValues, validate, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => handleChange(name, e.target.value);
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(onSubmit){
      onSubmit(values);
    }
  };

  return { errors, touched, getInputProps, handleSubmit, values };
}

export default useForm;