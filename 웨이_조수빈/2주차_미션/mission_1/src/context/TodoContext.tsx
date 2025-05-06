// src/context/TodoContext.tsx
import { createContext } from "react";
import { TTodo } from "../type/todo";

export interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
}

// context만 export
export const TodoContext = createContext<ITodoContext | undefined>(undefined);
