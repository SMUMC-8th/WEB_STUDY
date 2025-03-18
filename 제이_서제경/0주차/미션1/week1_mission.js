
// HTML 문서가 완전히 로드되면 실행되는 이벤트 리스너
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 입력 필드와 리스트 요소 가져오기
    const todoInput = document.getElementById("todoInput"); // 사용자 입력을 받을 input 요소
    const todoList = document.getElementById("todoList");   // '해야 할 일' 리스트 (ul 요소)
    const completedList = document.getElementById("completedList"); // '해낸 일' 리스트 (ul 요소)

     // 2. 사용자가 입력 후 'Enter' 키를 눌렀을 때 실행되는 이벤트 리스너
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && todoInput.value.trim() !== "") {
            // Enter 키를 누르고 입력값이 비어있지 않으면 실행
            addTodoItem(todoInput.value.trim());  // 새로운 할 일 추가 함수 호출
            todoInput.value = ""; // 입력 필드 초기화 (입력 후 텍스트 삭제)
        }
    });

    // 3. 할 일 추가 함수
    function addTodoItem(task) {
        const li = document.createElement("li"); // 새로운 <li> 요소 생성
        li.textContent = task; // <li> 요소에 입력한 텍스트 추가

        // 완료 버튼 생성
        const completeButton = document.createElement("button");  // 새로운 <button> 요소 생성
        completeButton.textContent = "완료"; // 버튼에 표시될 텍스트 설정
        completeButton.style.marginLeft = "10px"; // 버튼과 텍스트 사이 여백 추가
        
        // 완료 버튼 클릭 시 해당 할 일을 '해낸 일' 목록으로 이동하는 이벤트 추가
        completeButton.addEventListener("click", function () {
            moveToCompleted(li); // 완료 버튼 클릭 시 해낸 일 목록으로 이동
        });

        li.appendChild(completeButton); // 할 일 항목(li)에 '완료' 버튼 추가
        todoList.appendChild(li); // '해야 할 일' 목록(ul)에 할 일(li) 추가
    }

    // 4. 해낸 일로 이동하는 함수
    function moveToCompleted(item) {
        item.remove(); // 기존 '해야 할 일' 목록에서 해당 항목 삭제
        completedList.appendChild(item); // '해낸 일' 목록으로 항목 이동
        item.style.color = "gray"; // 완료된 항목의 텍스트 색상을 회색으로 변경하여 구분

        // 기존 "완료" 버튼 삭제
        const oldButton = item.querySelector("button"); // <li> 요소 내부에서 '완료' 버튼 찾기
        if (oldButton) {
            oldButton.remove();  // '완료' 버튼이 있으면 삭제
        }

        // "삭제" 버튼 생성
        const deleteButton = document.createElement("button");  // 새로운 <button> 요소 생성
        deleteButton.textContent = "삭제"; // 버튼에 표시될 텍스트 설정
        deleteButton.style.marginLeft = "10px"; // 버튼과 텍스트 사이 여백 추가
        deleteButton.style.cursor = "pointer"; // 마우스 오버 시 클릭할 수 있도록 포인터 스타일 추가

        // "삭제" 버튼 클릭 시 해당 할 일을 리스트에서 제거하는 이벤트 추가
        deleteButton.addEventListener("click", function () {
            item.remove(); // 클릭된 항목을 '해낸 일' 목록에서 제거
        });

        item.appendChild(deleteButton); // 완료된 항목에 "삭제" 버튼 추가
    }
});
