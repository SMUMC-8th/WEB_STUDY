import './App.css'
// import TodoBefore from './components/TodoBefore';
import React from 'react';
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';

// export default function App() {

//   // const [inputText, se]
//   const [todolist, setTodolist] = useState<string>("");
//   const [donelist, setDonelist] = useState<string>("");

//   // 할 일 추가 함수
//   const addTodo = (): void => {
//     // todos.push({ id: Date.now(), text });
//     // console.log(todos);
//     // todoInput.value = '';
//     // renderTasks();
// };


//   return (
//     <>

//     </>
//   )
// }

function App() {

    return (
      <>
        <TodoProvider>
          <Todo/>
        </TodoProvider>
      </>
    );
}

export default App;