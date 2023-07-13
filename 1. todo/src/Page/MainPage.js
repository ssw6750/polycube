import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState, filteredTodoListState, filterState } from "../@recoil/store";
import { Link } from "react-router-dom";

function MainPage() {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const [filter, setFilter] = useRecoilState(filterState);

  // 저장 함수
  const handleSaveTodo = (e) => {
    e.preventDefault()

    const newTodo = {
      id: todoList.length + 1,
      title: inputRef.current.value,
      time: new Date(),
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Main Page</h1>
      <form onSubmit={handleSaveTodo}>
        <input type="text" ref={inputRef} />
        <button type="submit">Save</button>
      </form>

      {/* 시간 기준 필터링 */}
      <div>
        <select value={filter} onChange={handleFilterChange}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      <ul>
        {filteredTodoList.map((todo) => (
          <li key={todo.id}>
            {/* 페이지 라우팅 */}
            <Link to={`/${todo.id}`}>
              {todo.title} - {todo.time.toString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
