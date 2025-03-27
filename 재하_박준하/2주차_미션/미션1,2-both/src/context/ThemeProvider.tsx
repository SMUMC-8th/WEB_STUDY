import { createContext, ReactNode, useState, useContext } from "react"

export enum THEME {
	LIGHT = "LIGHT",
	DARK = "DARK",
}

type Theme = THEME.LIGHT | THEME.DARK

interface IThemeContext {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext 
	= createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

	const toggleTheme = (): void => {
		setTheme((prevTheme): THEME =>
			prevTheme === THEME.LIGHT ? THEME.DARK: THEME.LIGHT
		);
	}

	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("need context!!!");
	}

	return (context);
}