const input	= document.querySelector('input');

input.addEventListener('keyup', (event) => {
	if (input.value !== "" && event.key === 'Enter') {
		addTodo(input.value);
		input.value = "";
	}
});

function addTodo(content) {
	const todolist = document.querySelector('#todolist');
	
// make node 
	const todoNode = document.createElement('li');
	todoNode.id = "todoNode";
	todoNode.innerHTML = `
		<span>
			${content}
		</span>
		<button>
			완료
		</button>
	`;

// add event
	const btn = todoNode.querySelector('button');
	btn.addEventListener('click', () => {
		todolist.removeChild(todoNode);
		addDone(content);
	});

// add child to list
	todolist.appendChild(todoNode);
}

function addDone(content) {
	const donelist = document.querySelector('#donelist');

// make node 
	const todoNode = document.createElement('li');
	todoNode.id = "todoNode";
	todoNode.innerHTML = `
		<span>
			${content}
		</span>
		<button>
			삭제
		</button>
	`;

// add event
	const btn = todoNode.querySelector('button');
	btn.addEventListener('click', () => {
		donelist.removeChild(todoNode);
	});

// add child to list
	donelist.appendChild(todoNode);
}