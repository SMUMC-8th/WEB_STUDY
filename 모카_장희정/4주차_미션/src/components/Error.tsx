import React from "react";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="error">
      <h2>오류가 발생했습니다</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
