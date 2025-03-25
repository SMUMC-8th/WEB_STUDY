import { createContext, useState, ReactNode, useContext } from "react";

export enum THEME {
	LIGHT= "LIGHT",
	DARK= "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK

interface IThemeContext {
	theme: TTheme;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

	const toggleTheme= (): void => {
		setTheme((prevTheme): THEME =>
			prevTheme === THEME.LIGHT ? THEME.DARK: THEME.LIGHT
		);
	}
	
	return (
		<ThemeContext.Provider value={{theme, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext);

	if (!context){
		throw new Error("need context!!!")
	}

	return (context);
}