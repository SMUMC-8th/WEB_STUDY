// Throttle : 일정 간격마다 실행

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay = 500) {
  const [throttleValue, setThrottleValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottleValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottleValue(value);
      }, delay);
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);
  return throttleValue;
}

export default useThrottle;
