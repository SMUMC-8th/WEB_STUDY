import { ReactElement } from "react";

const Loading = (): ReactElement => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">로딩 중...</p>
    </div>
  );
};

export default Loading;
