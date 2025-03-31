import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

export type Todo = {
	id: number;
	text: string;
}

interface ITodoContext {
	todos: Todo[];
	doneTodos: Todo[];
	addTodo: (text: string) => void;
	completeTodo: (todo: Todo) => void;
	deleteTodo: (todo: Todo) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({children}: {children: ReactNode}) => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

	const addTodo = (text :string): void => {
		const newTodo: Todo = {id: Date.now(), text: text};
		setTodos((prevTodos): Todo[] => [...prevTodos, newTodo]);
	}
	
	const completeTodo = (todo: Todo): void => {
		setTodos((prevTodos): Todo[] => {
			// filter를 통한 todo가 포함되어 있지않은 새 배열 반환
			return (prevTodos.filter((curTodo): boolean => curTodo.id !== todo.id))
		})
		setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
	}

	const deleteTodo = (todo: Todo): void => {
		setDoneTodos((prevDoneTodos): Todo[] => {
			// filter를 통한 todo가 포함되어 있지않은 새 배열 반환
			return (prevDoneTodos.filter((curTodo): boolean => curTodo.id !== todo.id));
		})
	}

	return (
		<TodoContext.Provider
			value={{todos, doneTodos, addTodo, completeTodo, deleteTodo}}>
			{children}
		</TodoContext.Provider>
	)
}

export function useTodo() {
	const context = useContext(TodoContext);

	if (!context) {
		throw new Error("Todo context Error!");
	}
	return (context);
}