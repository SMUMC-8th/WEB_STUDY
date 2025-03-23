const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoForm = document.querySelector(".form") as HTMLFormElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const doneList = document.getElementById("doneList") as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTask = (): void => {
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

const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTask();
};

const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTask();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement("li");
    li.classList.add("item");

    const span = document.createElement("span");
    span.classList.add("itemText");
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.classList.add("itemBtn");
    if (isDone) {
        button.textContent = "삭제";
        button.classList.add("delete");
    } else {
        button.textContent = "완료";
    }

    button.addEventListener("click", (): void => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });

    li.appendChild(span);
    li.appendChild(button);

    return li;
};

todoForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTask();
