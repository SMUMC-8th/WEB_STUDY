"use strict";
const todoInput = document.getElementById("todoInput");
const todoForm = document.querySelector(".form");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
let todos = [];
let doneTasks = [];
const renderTask = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTask();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTask();
};
const createTodoElement = (todo, isDone) => {
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
    }
    else {
        button.textContent = "완료";
    }
    button.addEventListener("click", () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(span);
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTask();
