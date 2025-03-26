import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      ></h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, harum.
        Dicta magni, error recusandae suscipit possimus reiciendis id modi
        fugiat, neque totam, reprehenderit est velit voluptatum temporibus
        minima molestiae praesentium!
      </p>
    </div>
  );
}

export default ThemeContent;
