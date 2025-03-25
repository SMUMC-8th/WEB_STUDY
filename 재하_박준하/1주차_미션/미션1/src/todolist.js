"use strict";
const $input = document.querySelector('#input');
const $inputBtn = document.querySelector('#inputBtn');
if ($input !== null) {
    $input.addEventListener('keyup', (event) => {
        if ($input.value !== "" && event.key === 'Enter') {
            addNodeTodo($input.value);
            $input.value = "";
        }
    });
}
if ($input !== null && $inputBtn !== null) {
    $inputBtn.addEventListener('click', () => {
        if ($input.value !== "") {
            addNodeTodo($input.value);
            $input.value = "";
        }
    });
}
;
const $todolist = document.querySelector('#todo ol');
function addNodeTodo(content) {
    if ($todolist !== null) {
        const node = document.createElement('li');
        node.innerHTML = `
			<p>
				${content}
			</p>
			<button>
				완료
			</button>
		`;
        const btn = node.querySelector('button');
        if (btn !== null) {
            btn.addEventListener('click', () => {
                addNodeDone(content);
                $todolist.removeChild(node);
            });
        }
        $todolist.appendChild(node);
    }
}
;
const $donelist = document.querySelector('#done ol');
function addNodeDone(content) {
    if ($donelist !== null) {
        const node = document.createElement('li');
        node.innerHTML = `
			<p>
				${content}
			</p>
			<button>
				삭제
			</button>
		`;
        const btn = node.querySelector('button');
        if (btn !== null) {
            btn.addEventListener('click', () => {
                $donelist.removeChild(node);
            });
        }
        $donelist.appendChild(node);
    }
}
