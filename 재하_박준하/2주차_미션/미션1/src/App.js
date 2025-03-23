import React from 'react';
import './App.css';
function App() {
    return (<>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <form id="todo-form" className="todo-container__form">
          <input type="text" id="todo-input" className="todo-container__input" placeholder="할 일 입력" required/>
          <button type="submit" className="todo-container__button">할 일 추가</button>
        </form>
        <div className="render-container">
          <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul id="todo-list" className="render-container__list"></ul>
          </div>
          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id="done-list" className="render-container__list"></ul>
          </div>
        </div>
      </div>
    </>);
}
export default App;
