import { createContext } from "react";

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

export type TTheme = THEME.LIGHT | THEME.DARK;

export interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
