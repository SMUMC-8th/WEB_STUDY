//커스텀 훅 분리, 선택사항
// src/context/useTodo.ts
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo는 반드시 <TodoProvider> 내부에서 사용되어야 합니다.");
  }
  return context;
};
