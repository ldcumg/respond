"use client";
import { useState, useEffect } from "react";
import browserClient from "@/utils/supabase/client";

type TodoState = {
  진행중: { id: string; todo: string; date: string; status: string; created_at: string }[];
  완료: { id: string; todo: string; date: string; status: string; created_at: string }[];
  취소: { todo: string; date: string; status: string; created_at: string }[];
};

export default function Schedule() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<TodoState>({ 진행중: [], 완료: [], 취소: [] });
  const [user, setUser] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("진행중");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const visibleTodos = todos[currentStatus as keyof TodoState];
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = visibleTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(visibleTodos.length / itemsPerPage);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await browserClient.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        setLoading(true);
        const { data, error } = await browserClient
          .from("schedule")
          .select("id, date, todo, status, created_at")
          .eq("user_id", user.id);
        setLoading(false);

        if (error) {
          console.error("투두 목록 불러오기 중 오류 발생:", error);
        } else {
          const 진행중 = data.filter((todo) => todo.status === "PROCESSING");
          const 완료 = data.filter((todo) => todo.status === "DONE");
          const 취소 = data.filter((todo) => todo.status === "CANCEL");
          setTodos({ 진행중, 완료, 취소 });
        }
      }
    };
    fetchTodos();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (!inputValue || !user) return console.log("사용자 정보가 없습니다.");

    const newTodo = {
      todo: inputValue,
      date: formatDate(new Date().toISOString()),
      status: "PROCESSING",
      user_id: user.id,
      created_at: new Date().toISOString()
    };

    const { data, error } = await browserClient.from("schedule").insert([newTodo]).select();
    if (error) return console.error("투두 추가 중 오류 발생:", error);

    const insertedTodo = { ...newTodo, id: data[0].id };
    setTodos((prev) => ({ ...prev, 진행중: [...prev.진행중, insertedTodo] }));
    setInputValue("");
    setCurrentPage(1);
  };

  const handleCompleteTodo = async (index: number) => {
    const todo = todos.진행중[index];
    const { error } = await browserClient.from("schedule").update({ status: "DONE" }).eq("id", todo.id);
    if (error) {
      console.error("투두 완료 처리 중 오류 발생:", error);
      return;
    }

    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index),
      완료: [...prev.완료, { ...todo, status: "DONE" }]
    }));
  };

  const handleCancelTodo = async (index: number) => {
    const todo = todos.진행중[index];
    const { error } = await browserClient.from("schedule").update({ status: "CANCEL" }).eq("id", todo.id);
    if (error) {
      console.error("투두 취소 처리 중 오류 발생:", error);
      return;
    }

    setTodos((prev) => ({
      ...prev,
      진행중: prev.진행중.filter((_, i) => i !== index),
      취소: [...prev.취소, { ...todo, status: "CANCEL" }]
    }));
  };

  const showTodos = (status: keyof TodoState) => {
    setCurrentStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMouseEnter = (status: string) => {
    setHoveredStatus(status);
  };

  const handleMouseLeave = () => {
    setHoveredStatus(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between gap-5">
        <div
          className={`mb-4 h-32 w-1/3 rounded-[15px] border-4 border-solid border-black p-4 ${
            hoveredStatus === "완료" ? "bg-[#DFDFDF]" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("완료")}
          onMouseLeave={handleMouseLeave}>
          <h2
            className="flex cursor-pointer items-center justify-between text-xl font-semibold"
            onClick={() => showTodos("완료")}>
            완료됨 <span>{todos.완료.length}</span>
          </h2>
        </div>
        <div
          className={`mb-4 h-32 w-1/3 rounded-[15px] border-4 border-solid border-black p-4 ${
            hoveredStatus === "진행중" ? "bg-[#DFDFDF]" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("진행중")}
          onMouseLeave={handleMouseLeave}>
          <h2
            className="flex cursor-pointer items-center justify-between text-xl font-semibold"
            onClick={() => showTodos("진행중")}>
            진행중 <span>{todos.진행중.length}</span>
          </h2>
        </div>
        <div
          className={`mb-4 h-32 w-1/3 rounded-[15px] border-4 border-solid border-black p-4 ${
            hoveredStatus === "취소" ? "bg-[#DFDFDF]" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("취소")}
          onMouseLeave={handleMouseLeave}>
          <h2
            className="flex cursor-pointer items-center justify-between text-xl font-semibold"
            onClick={() => showTodos("취소")}>
            취소됨 <span>{todos.취소.length}</span>
          </h2>
        </div>
      </div>

      {/* <div className="mt-4 flex items-center justify-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border-3 h-10 w-2/5 border-black"
        />
        <button onClick={handleAddTodo} className="ml-2 rounded bg-black px-2 py-1 text-white">
          추가하기
        </button>
      </div> */}

      {loading ? (
        <div className="mt-4 text-center">로딩 중...</div>
      ) : (
        <div className="mt-4">
          <h3 className="text-center text-xl font-semibold">{currentStatus} 리스트</h3>
          <ul className="mt-2 max-w-md justify-between max-w-1200 mx-auto">
            {currentTodos.map((todo, index) => (
              <li key={index} className="flex items-center justify-between divide-y divide-dashed p-2">
                <span>
                  {todo.todo} - {formatDate(todo.date)}
                </span>
                {currentStatus === "진행중" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleCompleteTodo(index)} className="rounded bg-black px-2 py-1 text-white">
                      완료
                    </button>
                    <button onClick={() => handleCancelTodo(index)} className="rounded px-2 py-1 ">
                      취소
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mr-2 rounded bg-black px-2 py-1 text-white ${
                  currentPage === index + 1 ? "font-bold" : ""
                }`}>
                {index + 1}
              </button>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
}
