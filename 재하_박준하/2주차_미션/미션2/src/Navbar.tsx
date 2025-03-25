import { useTheme } from "./context/ThemeProvider";
import ThemeTogglebutton from "./ThemeTogglebutton";
import { THEME } from "./context/ThemeProvider";
import clsx from "clsx";

const Navbar = () => {
	const {theme} = useTheme();

	const isLightMode = theme === THEME.LIGHT;

	return (
		<nav
			className={clsx(
				'p-4 w-full flex justify-end',
				isLightMode ? 'bg-white text-black': 'bg-black text-white'
			)}
		>
			<ThemeTogglebutton></ThemeTogglebutton>
		</nav>
	);
}

export default Navbar;