import { useTodo } from "../context/TodoContext";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const Todo = (): JSX.Element => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">EUNJI TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLable="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />

        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLable="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
