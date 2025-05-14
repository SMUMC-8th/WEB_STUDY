import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

function ThrottlePage() {
  const [scrollY, setScollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScollY(window.scrollY);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  console.log("리렌더링");

  return (
    <div>
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY:{scrollY}px</p>
      </div>
    </div>
  );
}

export default ThrottlePage;
