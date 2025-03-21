document.addEventListener("DOMContentLoaded", function () {
    let inputField = document.getElementById("taskInput");
    inputField.addEventListener("keypress", handleKeyPress);
});

// 엔터 키 입력 시 호출
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

// 해야 할 일 추가
function addTask() {
    let inputField = document.getElementById("taskInput");
    let taskText = inputField.value.trim();

    if (taskText === "") return; // 빈 입력값 방지

    let todoList = document.getElementById("todoList");

    let listItem = document.createElement("li");
    listItem.innerHTML = `${taskText} <button onclick="moveToDone(this)">완료</button>`;

    todoList.appendChild(listItem);
    inputField.value = ""; // 입력창 초기화
}

// 해낸 일로 이동
function moveToDone(button) {
    let doneList = document.getElementById("doneList");
    let listItem = button.parentElement;

    button.remove(); // "완료" 버튼 제거
    doneList.appendChild(listItem);
    // "삭제" 버튼 추가
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "삭제";
    deleteButton.onclick = function () {
        deleteTask(deleteButton);
    };

    listItem.appendChild(deleteButton); // "삭제" 버튼을 완료된 항목에 추가
    doneList.appendChild(listItem); // 완료된 항목을 doneList로 이동
}

// 삭제 기능
function deleteTask(button) {
    let listItem = button.parentElement;
    listItem.remove(); // 항목 삭제
}

