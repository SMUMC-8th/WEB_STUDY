document.addEventListener('DOMContentLoaded', () => {
    // HTML 요소 선택
    const todoInput = document.getElementById('todo_input') as HTMLInputElement;
    const todoForm = document.getElementById('todo_form') as HTMLFormElement;
    const todoList = document.getElementById('todo_list') as HTMLUListElement;
    const doneList = document.getElementById('done_list') as HTMLUListElement;

    // 할 일 타입 정의
    type Todo = {
        id: number;
        text: string;
    };

    // 할 일 목록
    let todos: Todo[] = [];
    let doneTasks: Todo[] = [];

    // 할 일 목록 렌더링 함수
    const renderTasks = (): void => {
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        todos.forEach((todo): void => {
            const li = createTodoElement(todo, false);
            todoList.appendChild(li);
        });

        doneTasks.forEach((todo): void => {
            const li = createTodoElement(todo, true);
            doneList.appendChild(li);
        });
    };

    // 할 일 텍스트 가져오기
    const getTodoText = (): string => {
        return todoInput.value.trim();
    };

    // 할 일 추가
    const addTodo = (text: string): void => {
        todos.push({ id: Date.now(), text });
        todoInput.value = '';
        renderTasks();
    };

    // 할 일 완료 처리
    const completeTodo = (todo: Todo): void => {
        todos = todos.filter((t): boolean => t.id !== todo.id);
        doneTasks.push(todo);
        renderTasks();
    };

    // 할 일 삭제
    const deleteTodo = (todo: Todo): void => {
        doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
        renderTasks();
    };

    // 할 일 아이템 생성 함수
    const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
        const li = document.createElement('li');
        li.classList.add('render_container_item');
        li.textContent = todo.text;

        const button = document.createElement('button');
        button.classList.add('render_container_item_button');

        if (isDone) {
            button.textContent = '삭제';
            button.style.backgroundColor = '#dc3545';
        } else {
            button.textContent = '완료';
            button.style.backgroundColor = '#28a745';
        }

        button.addEventListener('click', (): void => {
            if (isDone) {
                deleteTodo(todo);
            } else {
                completeTodo(todo);
            }
        });

        li.appendChild(button);
        return li;
    };

    // 폼 제출 이벤트 리스너
    todoForm.addEventListener('submit', (event: Event): void => {
        event.preventDefault();
        const text = getTodoText();
        if (text) {
            addTodo(text);
        }
    });

    renderTasks();
});
