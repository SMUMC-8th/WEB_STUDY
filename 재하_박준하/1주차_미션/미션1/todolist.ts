/* event listener */

	/* add node in todolist
		When (input btn click) or (input enter) */
const $input: HTMLInputElement | null = document.querySelector('#input');
const $inputBtn: HTMLButtonElement | null = document.querySelector('#inputBtn');

		// when input Enter
if ($input !== null) {
	$input.addEventListener('keyup', (event) => {
		if ($input.value !== "" && event.key === 'Enter') {
			addNodeTodo($input.value);
			$input.value = "";
		}
	});
}
		// when input Btn click
if ($input !== null && $inputBtn !== null) {
	$inputBtn.addEventListener('click', () => {
		if ($input.value !== "") {
			addNodeTodo($input.value);
			$input.value = "";
		}
	})
};
 

/* function */

	/* add node in todolist */
const $todolist: Element | null = document.querySelector('#todo ol');

function addNodeTodo(content: string): void {
	if ($todolist !== null) {
		const node: Element = document.createElement('li');
		node.innerHTML = `
			<p>
				${content}
			</p>
			<button>
				완료
			</button>
		`;

		// add event to go donelist
		const btn: HTMLButtonElement | null = node.querySelector('button');
		if (btn !== null) {
			btn.addEventListener('click', () => {
				addNodeDone(content);
				$todolist.removeChild(node);
			});
		}

		// append child
		$todolist.appendChild(node);
	}
};

	/* add node in donelist */
const $donelist: Element | null = document.querySelector('#done ol');

function addNodeDone(content: string): void {
	if ($donelist !== null) {
		const node: Element = document.createElement('li');
		node.innerHTML = `
			<p>
				${content}
			</p>
			<button>
				삭제
			</button>
		`;

		// add event to go remove
		const btn: HTMLButtonElement | null = node.querySelector('button');
		if (btn !== null) {
			btn.addEventListener('click', () => {
				$donelist.removeChild(node);
			});
		}

		// append child
		$donelist.appendChild(node);
	}
}