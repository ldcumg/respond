"use client";
import { useState } from "react";

// ToDo 상태의 타입 정의
type TodoState = {
  진행중: string[]; // 진행중인 할 일 목록
  완료: string[]; // 완료된 할 일 목록
  취소: string[]; // 취소된 할 일 목록
};

export default function Schedule() {
  // 입력값 상태 관리
  const [inputValue, setInputValue] = useState<string>("");
  // 할 일 상태 관리
  const [todos, setTodos] = useState<TodoState>({
    진행중: [],
    완료: [],
    취소: []
  });

  // 입력 필드의 변화에 따라 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 할 일 추가 함수
  const handleAddTodo = () => {
    if (!inputValue) return; // 입력값이 비어있다면 아무것도 하지 않음

    // 진행중 목록에 할 일을 추가
    setTodos((prev) => ({
      ...prev,
      진행중: [...prev.진행중, inputValue]
    }));

    // 입력값 초기화
    setInputValue("");
  };

  // 할 일을 완료로 변경하는 함수
  const handleCompleteTodo = (index: number) => {
    const todo = todos.진행중[index];
    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index), // 진행중 목록에서 제거
      완료: [...prev.완료, todo] // 완료 목록에 추가
    }));
  };

  // 할 일을 취소하는 함수
  const handleCancelTodo = (index: number) => {
    const todo = todos.진행중[index];
    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index), // 진행중 목록에서 제거
      취소: [...prev.취소, todo] // 취소 목록에 추가
    }));
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">스케쥴 관리</h1>
      <div className="flex justify-between">
        {/* 완료 목록 */}
        <div className="w-1/3 border p-4">
          <h2 className="text-xl font-semibold">완료</h2>
          <ul>
            {todos.완료.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
        {/* 진행중 목록 */}
        <div className="w-1/3 border p-4">
          <h2 className="text-xl font-semibold">진행중</h2>
          <ul>
            {todos.진행중.map((todo, index) => (
              <li key={index} className="flex items-center justify-between divide-y divide-dashed">
                {todo}
                <div>
                  <button
                    onClick={() => handleCompleteTodo(index)} // 완료 버튼 클릭 시 할 일 완료 처리
                    className="mr-2 rounded bg-green-500 px-2 py-1 text-white">
                    완료
                  </button>
                  <button
                    onClick={() => handleCancelTodo(index)} // 취소 버튼 클릭 시 할 일 취소 처리
                    className="rounded bg-red-500 px-2 py-1 text-white">
                    취소
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* 취소 목록 */}
        <div className="w-1/3 border p-4">
          <h2 className="text-xl font-semibold">취소</h2>
          <ul>
            {todos.취소.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* 입력 필드와 추가 버튼 */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
        />
        <button
          onClick={handleAddTodo} // 추가 버튼 클릭 시 할 일 추가
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
