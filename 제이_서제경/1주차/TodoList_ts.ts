// 1. HTML 요소 선택 (핸드북 자바 스크립트 편 참고)

// 사용자가 입력할 할 일을 가져오는 input 요소 선택 (input box 안에 있는 내용?)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;

// 할 일 입력 폼 (사용자가 할 일을 추가할 때 사용)
const todoForm = document.getElementById('todo-form') as HTMLFormElement;

// 할 일 목록을 담을 ul 요소 (미완료 목록)
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// 완료된 할 일 목록을 담을 ul 요소 (완료 목록)
const doneList = document.getElementById('done-list') as HTMLUListElement;


// 2. 할 일(Todo) 객체의 타입 정의
// 각 할 일 객체는 고유한 id(숫자)와 텍스트(문자열)를 가짐
type Todo = {
    id: number;
    text: string;
};

// Q. 왜 빈 배열 형태임?
let todos: Todo[] = [];        // 미완료된 할 일 목록을 저장하는 배열
let doneTasks: Todo[] = [];   // 완료된 할 일 목록을 저장하는 배열


// - 할 일 목록 렌더링 하는 함수를 정의
const renderTasks = (): void => {   
    
    // 기존 리스트 초기화 (중복 추가 방지)
    todoList.innerHTML = '';
    doneList.innerHTML = '';

     // 미완료 목록을 렌더링
    todos.forEach((todo) : void => {
        const li = createTodolElement(todo, false);
        todoList.appendChild(li);
    });

    // 완료 목록을 렌더링
    doneTasks.forEach((todo) : void => {
        const li = createTodolElement(todo, true);
        doneList.appendChild(li);
    });
};


// 3. 할 일 텍스트 입력 처리 함수. => 사용자가 입력한 할 일의 텍스트를 가져오는 함수
// 입력값을 가져와서 양 끝의 공백을 제거한 후 반환
const getTodoText = (): string => {
    return todoInput.value.trim();  
};


// 4. 새로운 할 일 추가 처리 함수
const addTodo = (text: string): void => {

    todos.push({id: Date.now(), text});   // 할 일 객체를 생성하여 todos 배열에 추가
    todoInput.value = '';                 // 입력 필드 지우기
    renderTasks();                        // 목록을 다시 렌더링
}


// 5. 할 일 상태 변경 (완료로 이동)
// todo 리스트 중에 내가 선택한 애 빼고 다 렌더링해서 보여줘(선택한 애는 완료로 넘어가야 하니까)
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id); //완료된 할 일을 todos 배열에서 제거
    doneTasks.push(todo);  //완료된 할 일 목록에 추가
    renderTasks();         //목록 다시 렌더링
};


// 6. 완료된 할 일 삭제 함수 (filter만 해주면 됨)
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);  // 선택한 할 일을 완료된 목록에서 제거
    renderTasks(); //목록 다시 렌더링
};



// 7. 할 일 항목을 생성하는 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
// isDone 매개변수를 활용하여 버튼 스타일과 텍스트를 변경

const createTodolElement = (todo: Todo, isDone: boolean): HTMLElement => {
    // 리스트 아이템 요소 생성
    const li = document.createElement('li');       
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    // 버튼 요소 생성
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    // 완료 여부에 따라 버튼 스타일 및 기능 설정
    if(isDone){
        button.textContent = '삭제';                // 완료된 할 일 → 삭제 버튼
        button.style.backgroundColor = '#dc3545';  // 빨간색 배경
    } else {
        button.textContent = '완료';                 // 미완료된 할 일 → 완료 버튼
        button.style.backgroundColor = '#28a745';   // 초록색 배경
    }

    // 버튼 클릭 이벤트 추가 (완료 혹은 삭제 기능 수행)
    button.addEventListener('click',() : void => {
        if(isDone){
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });

    // 리스트 아이템 버튼 추가 후 반환
    li.appendChild(button);
    return li;
};


// 8. 폼 제출 이벤트 리스너 
// : 3번을 통해서 텍스트를 받아오고 텍스트가 있다면 addtodo를 활용해서 텍스트를 넣어주는것
todoForm.addEventListener('submit', (event: Event): void => {
    
    event.preventDefault();      // 기본 동작(새로고침) 방지

    const text = getTodoText(); // 사용자가 입력한 텍스트 가져오기

    if(text){                   
        addTodo(text);          // 입력값이 있으면 할 일 목록에 추가
    }
});


renderTasks();  // 처음 실행 시 목록을 렌더링하여 초기 상태를 보여줌