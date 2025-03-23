import { TTodo } from "../types/todo";

interface TodolistProps {
  title: string;
  todos?: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

function TodoList({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodolistProps) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list">
        {todos?.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render__item-text">{todo.text}</span>
            <button
              onClick={(): void => onClick(todo)} //값을 넘겨줄 경우에는 arrow
              style={{
                backgroundColor: buttonColor,
              }}
              className="render-container__item-button"
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
