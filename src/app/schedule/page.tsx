"use client";
import { useState } from "react";

// ToDo 상태의 타입 정의
type TodoState = {
  진행중: { 내용: string; 날짜: string }[]; // 진행중인 할 일 목록
  완료: { 내용: string; 날짜: string }[]; // 완료된 할 일 목록
  취소: { 내용: string; 날짜: string }[]; // 취소된 할 일 목록
};

export default function Schedule() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<TodoState>({
    진행중: [],
    완료: [],
    취소: []
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue) return;

    // 현재 날짜 가져오기
    const today = new Date();
    const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    // 진행중 목록에 할 일을 추가
    setTodos((prev) => ({
      ...prev,
      진행중: [...prev.진행중, { 내용: inputValue, 날짜: dateString }]
    }));

    setInputValue("");
  };

  const handleCompleteTodo = (index: number) => {
    const todo = todos.진행중[index];
    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index),
      완료: [...prev.완료, todo]
    }));
  };

  const handleCancelTodo = (index: number) => {
    const todo = todos.진행중[index];
    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index),
      취소: [...prev.취소, todo]
    }));
  };

  const totalPages = Math.ceil(todos.진행중.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = todos.진행중.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">스케쥴 관리</h1>
      <div className="flex justify-between gap-5">
        <div className="border-3 mb-4 w-1/3 border-solid p-4 rounded-[15px] border-black">
          <h2 className="flex items-center justify-between text-xl font-semibold">
            완료 <span>{todos.완료.length}</span>
          </h2>
          <ul>
            {todos.완료.map((todo, index) => (
              <li key={index}>
                {todo.내용} - {todo.날짜}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-3 mb-4 w-1/3 border-solid p-4 rounded-[15px] border-black">
          <h2 className="flex items-center justify-between text-xl font-semibold">
            진행중 <span>{todos.진행중.length}</span>
          </h2>
        </div>
        <div className="border-3 mb-4 w-1/3 border-solid p-4 rounded-[15px] border-black">
          <h2 className="flex items-center justify-between text-xl font-semibold">
            취소 <span>{todos.취소.length}</span>
          </h2>
          <ul>
            {todos.취소.map((todo, index) => (
              <li key={index}>
                {todo.내용} - {todo.날짜}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
      <div className="mt-4 flex items-center justify-center ">
        <input type="text" value={inputValue} onChange={handleInputChange} className="h-10 w-3/5 border-3  rounded-[15px] border-black" />
        <button onClick={handleAddTodo} className="ml-2">
          추가하기
        </button>
      </div>
      <div>
      <label>투두리스트 </label>
      <ul>
        {currentTodos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between divide-y divide-dashed">
            {todo.내용} - {todo.날짜}
            <div>
              <button
                onClick={() => handleCompleteTodo(startIndex + index)}
                className="mr-2 rounded px-2 py-1">
                완료
              </button>
              <button
                onClick={() => handleCancelTodo(startIndex + index)}
                className="rounded px-2 py-1 ">
                취소
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 rounded px-3 py-1 ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"}`}>
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
    </div>
  );
}
