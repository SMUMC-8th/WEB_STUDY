// HTML과 React 앱을 연결해주고 실제 App 렌더링해주는 파일

import { StrictMode } from "react"; // React의 StrictMode 컴포넌트 import (개발 중 오류나 잠재적 문제를 감지해줌)
import { createRoot } from "react-dom/client"; // 루트 DOM 렌더링 함수 import
import "./index.css";
import App from "./App.tsx"; // 우리가 만든 App 컴포넌트 import (앱의 실제 내용이 들어있는 컴포넌트)

// HTML 문서에서 id="root"인 요소를 찾아 React 앱을 마운트할 준비
createRoot(document.getElementById("root")!).render(
  // StrictMode: 개발 환경에서만 작동, 잠재적 문제를 감지하기 위해 컴포넌트를 감싸줌
  <StrictMode>
    {/* React Query를 전역으로 사용할 수 있게 Provider로 App을 감쌈 */}

    {/* App 컴포넌트를 렌더링: 실제 라우팅, 페이지 전환, Context 등의 기능이 여기에 있음 */}
    <App />
  </StrictMode>
);
