import Worklist from "./Worklist";

export default function Todolist() {
	return (
		<article className="flex flex-col sm:flex-row justify-center sm:justify-around itemes-center">
			<Worklist 
				title="할 일">
			</Worklist>
			<Worklist 
				title="완료">
			</Worklist>
		</article>
	);
}