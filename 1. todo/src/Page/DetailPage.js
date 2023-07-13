import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { todoListState } from "../@recoil/store";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todo = todoList.find((todo) => todo.id === Number(id));
  const [idValue, setIdValue] = useState(todo?String(todo.id):null);
  const [title, setTitle] = useState(todo?todo.title:null);
  const [time, setTime] = useState( todo?
    todo.time.toISOString().slice(0, 16): null
  );

  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTodoUpdate = () => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === Number(id)
        ? { ...todo, id: Number(idValue), title, time: new Date(time) }
        : todo
    );
    setTodoList(updatedTodoList);
    navigate("/");
  };

  const handleTodoDelete = () => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== Number(id));
    setTodoList(updatedTodoList);
    navigate("/");
  };

  if (!todo) {
    return <p>Todo not found</p>;
  }

  return (
    <div>
      <h1>Detail Page</h1>
      <div>
        <p>ID:</p>
        <input type="number" value={idValue} onChange={handleIdChange} />
        <p>Title:</p>
        <input type="text" value={title} onChange={handleTitleChange} />
        <p>Time:</p>
        <input type="datetime-local" value={time} onChange={handleTimeChange} />
        <button onClick={handleTodoUpdate}>Update</button>
        <button onClick={handleTodoDelete}>Delete</button>
      </div>
    </div>
  );
}

export default DetailPage;
