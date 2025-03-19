// 1. HTML 요소 선택 (핸드북 자바 스크립트 편 참고)
var todoInput = document.getElementById('todo-input');
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todo-list');
var doneList = document.getElementById('done-list');
var todos = []; // 빈 배열 만들어주기. Todo라는 타입에 맞게 들어가야하고 배열 형태를 따른다
var doneTasks = []; // 완료된 애들도 Todo의 배열 형태
// - 할 일 목록 렌더링 하는 함수를 정의
var renderTasks = function () {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = createTodolElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(function (todo) {
        var li = createTodolElement(todo, true);
        doneList.appendChild(li);
    });
};
// 3. 할 일 텍스트 입력 처리 함수.(공백 잘라줌)
var getTodoText = function () {
    return todoInput.value.trim();
};
// 4. 할 일 추가 처리 함수
var addTodo = function (text) {
    todos.push({ id: Date.now(), text: text }); //todo라는 배열에 넣어줄거임,
    todoInput.value = '';
    renderTasks(); // 추가했으니까 다시 렌더링 시켜라
};
// 5. 할 일 상태 변경 (완료로 이동)
// todo 리스트 중에 내가 선택한 애 빼고 다 렌더링해서 보여줘(선택한 애는 완료로 넘어가야 하니까)
var completeTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    doneTasks.push(todo); //오른쪽 완료로 넣어짐
    renderTasks();
};
// 6. 완료된 할 일 삭제 함수 (filter만 해주면 됨)
var deleteTodo = function (todo) {
    doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; });
    // 넣어주는 push 동작없이 바로 렌더하면됨 (삭제만 하면 되니까)
    renderTasks();
};
// 7. 할일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
var createTodolElement = function (todo, isDone) {
    var li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;
    var button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }
    button.addEventListener('click', function () {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
// 8. 폼 제출 이벤트 리스너 
// : 3번을 통해서 텍스트를 받아오고 텍스트가 있다면 addtodo를 활용해서 텍스트를 넣어주는것
todoForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 계속 새로고침되는 것을 피함
    var text = getTodoText();
    if (text) { // text가 있으면
        addTodo(text); // add todo로 text 넣어줌
    }
});
renderTasks(); //항상 처음에는 렌더링 시켜줘(없어도 동작)
