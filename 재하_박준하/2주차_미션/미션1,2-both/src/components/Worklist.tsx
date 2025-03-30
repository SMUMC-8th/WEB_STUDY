import { Todo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";

export enum workType {
  TODO = "할 일!",
  DONE = "완료~",
  TODOBTN = "완료",
  DONEBTN = "삭제",
}

type workProps = {
  todoArr: Todo[];
  todoFunc: (todo: Todo) => void;
  type: workType;
  typeBtn: workType;
};

export default function Worklist({
  todoArr,
  todoFunc,
  type,
  typeBtn,
}: workProps) {
  const { theme } = useTheme();
  const btnBgColor =
    type === workType.TODO
      ? theme === THEME.LIGHT
        ? "text-white bg-green-500 hover:bg-green-700"
        : "text-black bg-green-700 hover:bg-green-900"
      : // if workType === 완료
      theme === THEME.LIGHT
      ? "text-white bg-red-500 hover:bg-red-700"
      : "text-black bg-red-700 hover:bg-red-900";

  const content = todoArr.map((todo) => {
    return (
      <li
        className={`box-border w-full m-1 p-2 flex flex-col sm:flex-row items-center border-black border-[1px] rounded-xl
					${theme === THEME.LIGHT ? " bg-zinc-100" : ""}`}
      >
        <p className="box-border w-full m-1 p-1 text-center sm:text-left">
          {todo.text}
        </p>
        <button
          onClick={() => todoFunc(todo)}
          className={`box-border sm:w-[80px] sm:m-1 p-2 rounded-xl ${btnBgColor}`}
        >
          {typeBtn}
        </button>
      </li>
    );
  });

  return (
    <div className="box-border w-full sm:m-1 p-2 flex flex-col text-center break-all">
      <p className="m-2 p-2 text-base sm:text-3xl font-semibold">{type}</p>
      <ul className="box-border flex flex-col items-center">{content}</ul>
    </div>
  );
}
