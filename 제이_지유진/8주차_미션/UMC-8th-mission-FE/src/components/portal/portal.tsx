// ReactDOM에서 포털 기능을 제공하는 createPortal을 가져옵니다.
import ReactDom from "react-dom";

// Portal 컴포넌트 정의 (props로 children을 받음)
const Portal = ({ children }: { children: React.ReactNode }) => {
  // HTML 문서에서 id가 "modal-root"인 요소를 가져옵니다.
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  // 만약 해당 요소가 없으면 아무 것도 렌더링하지 않음 (예외 방지용)
  if (!modalRoot) {
    return null;
  }

  // createPortal을 사용해 children을 modalRoot에 렌더링함
  // 즉, React 컴포넌트 트리 밖의 DOM 요소에 내용을 삽입함
  return ReactDom.createPortal(children, modalRoot);
};
export default Portal;
