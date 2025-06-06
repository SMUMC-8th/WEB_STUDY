import { FormEvent, useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      addTodo(text);
      setInput("");
    }
  };
  //구조분해할당핵심
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
