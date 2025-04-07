import { StrictMode } from "react"; // React의 StrictMode 컴포넌트 import (개발 중 오류나 잠재적 문제를 감지해줌)
import { createRoot } from "react-dom/client"; // 루트 DOM 렌더링 함수 import
import "./index.css";
import App from "./App.tsx"; // 우리가 만든 App 컴포넌트 import (앱의 실제 내용이 들어있는 컴포넌트)

// HTML의 id가 'root'인 요소를 찾아서 React 앱을 연결할 준비
// StrictMode로 감싸서 앱을 렌더링 (개발 중 오류 확인용)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
