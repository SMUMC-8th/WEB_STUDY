import { useTodo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

interface WorklistProps {
	title: string;
}

export default function Worklist({title}: WorklistProps) {
	const {theme} = useTheme();
	const {todos, doneTodos, completeTodo, deleteTodo} = useTodo();

	let content = null; 
	if (title === "할 일") {
		content = todos.map((todo: {id:number, text:string}) => {
			return (
				<li
					className={theme === THEME.LIGHT
								? "w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border border-black border-[1px] bg-zinc-100"
								: "w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border border-black border-[1px] "
					}>
					<p className="w-full sm:m-1 sm:p-1 text-left">{todo.text}</p>
					<button 
						onClick={() => completeTodo(todo)}
						className={theme === THEME.LIGHT
									? 'w-[50px] sm:m-1 sm:p-1 text-white bg-green-500'
									: 'w-[50px] sm:m-1 sm:p-1 text-black bg-green-700'
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
					className={theme === THEME.LIGHT
								? "w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border border-black border-[1px] bg-zinc-100"
								: "w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-center border border-black border-[1px] "
					}>
					<p className="w-full sm:m-1 sm:p-1 text-left">{doneTodo.text}</p>
					<button 
						onClick={() => deleteTodo(doneTodo)}
						className={theme === THEME.LIGHT
									? 'w-[50px] sm:m-1 sm:p-1 text-white bg-red-500'
									: 'w-[50px] sm:m-1 sm:p-1 text-black bg-red-700'
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