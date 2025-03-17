// 요소 선택
const inputBox = document.querySelector<HTMLInputElement>(".inputBox");
const addButton = document.querySelector<HTMLButtonElement>(".btn");
const doBox = document.querySelector<HTMLDivElement>("#do-container");
const doneBox = document.querySelector<HTMLDivElement>("#done-container");


// 할 일 추가시킴 근데 반환값이 없으니까 void
const addTask = (): void => {
    if (!inputBox || !doBox) return; 

    const doTask = inputBox.value.trim(); // 유효성 검사할 때 trim() 많이 쓴다!!
    if (doTask === "") return;

    // checkBox 만드세요 ..
    const newCheckBox = document.createElement("div");
    newCheckBox.classList.add("checkBox"); // 할 일 스타일 적용
    newCheckBox.innerHTML = `
        <p>${doTask}</p>
        <button class="btn complete-btn">완료</button>
    `;

    // 완료 버튼 기능 추가
    const doneBtn = newCheckBox.querySelector<HTMLButtonElement>(".complete-btn");
    doneBtn?.addEventListener("click", () => moveToDone(newCheckBox));

    // 쳌박스를 투두 목록에 추가
    doBox.appendChild(newCheckBox);
    inputBox.value = "";
};


// 완료 목록으로 이동하는 함수
const moveToDone = (newCheckBox: HTMLDivElement): void => {
    if (!doneBox) return;

    // 기존 버튼 삭제하고 새로운 "삭제" 버튼 추가
    newCheckBox.querySelector("button")?.remove();
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", () => removeTask(newCheckBox));

    // 새로운 버튼 추가
    newCheckBox.appendChild(delBtn);

    // Done 목록으로 이동
    doneBox.appendChild(newCheckBox);
};

// 삭제 함수
const removeTask = (newCheckBox: HTMLDivElement): void => {
    newCheckBox.remove();
};

// 이벤트 리스너 추가 (할 일 추가 버튼)
addButton?.addEventListener("click", addTask);

