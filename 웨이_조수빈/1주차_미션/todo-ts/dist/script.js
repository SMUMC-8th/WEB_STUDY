"use strict";
const inputBox = document.querySelector(".inputBox");
const addButton = document.querySelector(".btn");
const doBox = document.querySelector("#do-container");
const doneBox = document.querySelector("#done-container");
const addTask = () => {
    if (!inputBox || !doBox)
        return;
    const doTask = inputBox.value.trim();
    if (doTask === "")
        return;
    const newCheckBox = document.createElement("div");
    newCheckBox.classList.add("checkBox");
    newCheckBox.innerHTML = `
        <p>${doTask}</p>
        <button class="btn complete-btn">완료</button>
    `;
    const doneBtn = newCheckBox.querySelector(".complete-btn");
    doneBtn === null || doneBtn === void 0 ? void 0 : doneBtn.addEventListener("click", () => moveToDone(newCheckBox));
    doBox.appendChild(newCheckBox);
    inputBox.value = "";
};
const moveToDone = (newCheckBox) => {
    var _a;
    if (!doneBox)
        return;
    (_a = newCheckBox.querySelector("button")) === null || _a === void 0 ? void 0 : _a.remove();
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn");
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", () => removeTask(newCheckBox));
    newCheckBox.appendChild(delBtn);
    doneBox.appendChild(newCheckBox);
};
const removeTask = (newCheckBox) => {
    newCheckBox.remove();
};
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addTask);
