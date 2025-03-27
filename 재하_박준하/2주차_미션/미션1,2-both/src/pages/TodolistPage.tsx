import Navbar from "../components/Navbar";
import InputForm from "../components/InputForm";
import Todolist from "../components/Todolist";
import { useTheme } from "../context/ThemeProvider";
import { THEME } from "../context/ThemeProvider";
import { TodoProvider } from "../context/TodoContext";

export default function TodolistPage() {
	const {theme} = useTheme();
	
	return (
        <section 
		  className={theme === THEME.LIGHT 
		  		? "w-[50%] break-all bg-white" 
				: "w-[50%] break-all bg-gray-500"}>
			<Navbar></Navbar>
			<TodoProvider>
				<InputForm></InputForm>
				<Todolist></Todolist>
			</TodoProvider>
        </section>
	)
}
