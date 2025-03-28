import { useState } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";
import { useTodo } from "../context/TodoContext";

export default function InputForm() {
	const [inputValue, setInputValue] = useState<string>("");
	const {theme} = useTheme();
	const {addTodo} = useTodo();

	const handleForm = (event: React.FormEvent) => {
		event.preventDefault();
		
		const text = inputValue.trim(); 
		if (text.length > 0) {
			addTodo(inputValue.trim());
			setInputValue('');
		}
	};

	return (
		<form onSubmit={handleForm} className="w-[100%]flex flex-col">
			<p className="text-3xl sm:text-5xl text-center">Jun Todo</p>
			<article className="flex flex-col sm:flex-row sm:m-2 sm:p-2">
				<input 
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					className="sm:w-full inline sm:m-2 sm:p-2 border-black border-[1px] bold text-xs sm:text-xl "
					type="text"
					placeholder="할 일 입력">
				</input>
				<button type="submit" 
					className={theme ===THEME.LIGHT
						? "sm:w-[120px] sm:m-2 sm:p-2 bg-green-500 hover:bg-green-700 text-xs sm:text-base text-white"
						: "sm:w-[120px] sm:m-2 sm:p-2 bg-green-800 hover:bg-green-900 text-xs sm:text-base text-black"}>
							할 일 추가
				</button>
			</article>
		</form>
	);
}