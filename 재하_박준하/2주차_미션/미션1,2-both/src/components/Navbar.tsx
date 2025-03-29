import { useTheme } from "../context/ThemeProvider";
import { THEME } from "../context/ThemeProvider";

export default function Navbar() {
	const {theme, toggleTheme} = useTheme();

	return (
		<nav className="w-full flex justify-end items-center">
			<button 
				onClick={toggleTheme}
				className={`m-2 p-2 font-bold py-2 px-4 rounded
					${theme === THEME.LIGHT
					? " bg-yellow-100 hover:bg-yellow-300"
					: " bg-gray-500 hover:bg-gray-700"}`}>
					{theme === THEME.LIGHT ? "☀️" : "🌙"}
			</button>
		</nav>
	);
}