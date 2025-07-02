import { useState } from "react";
import "./App.css";

/*
1. 수정 버튼을 클릭한 경우에만 `input`이 보이도록 코드를 작성해보세요. ✅
2. 할일 완료상태를 체크할 수 있는 요소를 추가해보세요 ✅.
3. Todo 앱의 제목을 표시하는 헤더를 추가해보세요. ✅ */


function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
    <div className="container">
      <h1>📋 TodoList </h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-container">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);
  
  return (
    <li className="todo-list">
      <div className="todo">
          <input type="checkbox" id="checkbox" />
            <span>{todo.content}</span>
        {edit && (
          <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
        )}
      </div>
      <button className="edit_btn"
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
          setEdit(!edit)
        }}
      >
        {edit ? "저장" : "수정"}
      </button>

      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
