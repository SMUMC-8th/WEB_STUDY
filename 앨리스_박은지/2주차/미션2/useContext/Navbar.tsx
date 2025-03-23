import { THEME, useTheme } from 'react';
import ThemeToggleButton from "../ThemeToggleButton";
import clsx from 'clsx';

export default function Navbar():  {
    const { theme, toggleTheme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;
    const {theme} = useTheme();
    return (
        <nav 
        className={clsx(
            'p-4 w-full flex justify-end',
            isLightMode ? "bg-white" : "bg-gray-800"
        )}
    >
    <ThemeToggleButton />
    </nav>
    );
}
