//useThrottle : 주어진 값 (상태)가 자주 변경될 때
//최소 interval(지연시간) 만큼만 변경되도록 하는 훅

import { useEffect, useState, useRef } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const lastExcuted: React.RefObject<number> = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExcuted.current + delay) {
      setThrottledValue(value);
      lastExcuted.current = Date.now();
    } else {
      const timerId: number = setTimeout(() => {
        lastExcuted.current = Date.now();
        setThrottledValue(value);
      }, delay);
      return () => clearTimeout(timerId);
    }
  }, [value, delay]); // value와 delay가 변경될 때마다 effect 실행
  return throttledValue;
}

export default useThrottle;
