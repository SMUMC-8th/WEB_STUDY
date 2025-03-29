import Worklist from "./Worklist";
import { useTodo } from "../context/TodoContext";
import { workType } from "./Worklist";

export default function Todolist() {
	const {todos, doneTodos, completeTodo, deleteTodo} = useTodo();

	return (
		<article className="box-border flex flex-col sm:flex-row justify-center sm:justify-around itemes-center">
			<Worklist 
				todoArr={todos}
				todoFunc={completeTodo}
				type={workType.TODO}
				>
			</Worklist>
			<Worklist 
				todoArr={doneTodos}
				todoFunc={deleteTodo}
				type={workType.DONE}
				>
			</Worklist>
		</article>
	);
}