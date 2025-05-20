import { ReactElement } from "react";
import React from "react";

const Loading = (): ReactElement => {
  return (
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <p className="loading-text">로딩 중...</p>
    </div>
  );
};

export default Loading;
