// debounce : 마지막 이벤트 이후 일정 시간 지나면 실행, 입력이 멈춘 후에 실행됨

import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 30000) => {
  const [debouncedValue, setdebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
