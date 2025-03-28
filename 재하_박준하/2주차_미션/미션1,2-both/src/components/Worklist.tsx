import { Todo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

export enum workType {
	TODO = "할 일",
	DONE = "완료",
}

type workProps = {
	todoArr: Todo[];
	todoFunc: (todo: Todo) => void;
	type: workType;
}

export default function Worklist({todoArr, todoFunc, type}: workProps) {
	const {theme} = useTheme();
	const btnBgColor = (type === workType.TODO
					? (theme === THEME.LIGHT
						? 'text-white bg-green-500'
						: 'text-black bg-green-700'
					)
					// if workType === 완료
					: (theme === THEME.LIGHT
						? 'text-white bg-red-500'
						: 'text-black bg-red-700'
					));

	const content = todoArr.map((todo) => {
		return (
			<li 
				className={`box-border w-full sm:m-1 sm:p-1 flex flex-col sm:flex-row items-centerborder-black border-[1px]
					${theme === THEME.LIGHT ? ' bg-zinc-100' : ''}` }>
				<p className="box-border w-full sm:m-1 sm:p-1 text-left">{todo.text}</p>
				<button 
					onClick={() => todoFunc(todo)}
					className={`box-border w-[60px] sm:m-1 sm:p-1 ${btnBgColor}`
					}>
						{type}
				</button>
			</li>
		);
	})
	
	return (
		<div className="box-border w-full sm:m-1 sm:p-1 flex flex-col text-center break-all">
			<p className="m-2 p-2 text-base sm:text-3xl font-semibold">{type}</p>
			<ul className="box-border flex flex-col items-center">
				{content}
			</ul>
		</div>
	);
}