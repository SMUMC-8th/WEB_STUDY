import { Todo, useTodo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

enum titleContent {
	TODO = "할 일",
	DONE = "완료",
}

interface WorklistProps {
	title: string;
}

export default function Worklist({title}: WorklistProps) {
	const {theme} = useTheme();
	const {todos, doneTodos, completeTodo, deleteTodo} = useTodo();

	let content = null; 
	if (title === titleContent.TODO) {
		content = todos.map((todo: Todo) => {
			return (
				<li
					className={`w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border-black border-[1px]
						${theme === THEME.LIGHT
						? " bg-zinc-100" : " "}`
					}>
					<p className="w-full sm:m-1 sm:p-1 text-left">{todo.text}</p>
					<button 
						onClick={() => completeTodo(todo)}
						className={`w-[50px] sm:m-1 sm:p-1
							${theme === THEME.LIGHT
							? ' text-white bg-green-500' : ' text-black bg-green-700'}`
						}>
							완료
					</button>
				</li>
			);
		})
	} else { // if btnName === '삭제'
		content = doneTodos.map((doneTodo: {id:number, text:string}) => {
			return (
				<li
					className={`w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border-black border-[1px]
						${theme === THEME.LIGHT ? " bg-zinc-100" : " "}`
					}>
					<p className="w-full sm:m-1 sm:p-1 text-left">{doneTodo.text}</p>
					<button 
						onClick={() => deleteTodo(doneTodo)}
						className={`w-[50px] sm:m-1 sm:p-1
							${theme === THEME.LIGHT
							? ' text-white bg-red-500': ' text-black bg-red-700'}`
						}>
							삭제
					</button>
				</li>
			);
		})
	}

	return (
		<div className="w-full sm:m-1 sm:p-1 flex flex-col text-center break-all">
			<p className="m-2 p-2 text-base sm:text-3xl font-semibold">{title}</p>
			<ul className="flex flex-col">
				{content}
			</ul>
		</div>
	);
}