import { useTheme } from "./context/ThemeProvider";
import { THEME } from "./context/ThemeProvider";
import clsx from "clsx";

const ThemeContent = () => {
	const {theme} = useTheme();

	const isLightMode = theme === THEME.LIGHT;

	return (
		<div
			className={clsx('p-4 h-dvh w-full',
				isLightMode ? 'bg-white text-black': 'bg-black text-white'
			)}>
			<h1 className={clsx(
				'text-wxl font-bold',
				isLightMode ? 'bg-white text-black': 'bg-black text-white'
			)}>
				ThemeContent
			</h1>
			<p  className={clsx('mt-2',
				isLightMode ? 'bg-white text-black': 'bg-black text-white'
			)}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta quo ex tempore eveniet eaque hic sint perspiciatis, obcaecati dolore est provident. Magni et aliquid beatae reiciendis quos qui recusandae quae.	
			</p>
		</div>
	)
}

export default ThemeContent;