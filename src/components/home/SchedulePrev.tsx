"use client";
import { useState, useEffect } from "react";
import browserClient from "@/utils/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type TodoState = {
  진행중: { id: string; todo: string; date: string; status: string; created_at: string }[];
  완료: { id: string; todo: string; date: string; status: string; created_at: string }[];
  취소: { todo: string; date: string; status: string; created_at: string }[];
};

export default function Schedule() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<TodoState>({
    진행중: [],
    완료: [],
    취소: []
  });

  const [user, setUser] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("진행중");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

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
        const { data, error } = await browserClient
          .from("schedule")
          .select("id, date, todo, status, created_at")
          .eq("user_id", user.id);

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

    const insertedTodo = {
      ...newTodo,
      id: data[0].id
    };

    setTodos((prev) => ({
      ...prev,
      진행중: [...prev.진행중, insertedTodo]
    }));

    setInputValue("");
    setCurrentPage(1); // 페이지 리셋
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
    setCurrentPage(1); // 상태 변경 시 페이지 리셋
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
    <div className="h-[80vh] overflow-y-auto bg-gray-100 p-8">
    
      <div className="flex justify-between mt-5 gap-4">
        <div
          className={`h-[120px] w-3/6 rounded-xl border-4 border-solid border-black p-5 shadow-lg transition-all duration-300 ease-in-out ${
            hoveredStatus === "완료" ? "bg-green-200" : "bg-white"
          }`}
          onMouseEnter={() => handleMouseEnter("완료")}
          onMouseLeave={handleMouseLeave}>
          <div className="flex items-start justify-start">
            <CheckCircle className="text-4xl text-green-600" />
          </div>
          <h2 className="mt-4 flex justify-end text-l font-semibold text-gray-800" onClick={() => showTodos("완료")}>
            완료됨 <span className="ml-2">({todos.완료.length})</span>
          </h2>
        </div>
        <div
          className={`h-[120px] w-3/6 rounded-xl border-4 border-solid border-black p-5 shadow-lg transition-all duration-300 ease-in-out ${
            hoveredStatus === "진행중" ? "bg-blue-200" : "bg-white"
          }`}
          onMouseEnter={() => handleMouseEnter("진행중")}
          onMouseLeave={handleMouseLeave}>
          <div className="flex items-start justify-start">
            <Loader2 className="animate-spin text-4xl text-blue-600" />
          </div>
          <h2 className="mt-4 flex justify-end text-l font-semibold text-gray-800" onClick={() => showTodos("진행중")}>
            진행중 <span className="ml-2">({todos.진행중.length})</span>
          </h2>
        </div>
        <div
          className={`h-[120px] w-2/6 rounded-xl border-4 border-solid border-black p-5 shadow-lg transition-all duration-300 ease-in-out ${
            hoveredStatus === "취소" ? "bg-red-200" : "bg-white"
          }`}
          onMouseEnter={() => handleMouseEnter("취소")}
          onMouseLeave={handleMouseLeave}>
          <div className="flex items-start justify-start">
            <XCircle className="text-4xl text-red-600" />
          </div>
          <h2 className="mt-4 flex justify-end text-xl font-semibold text-gray-800" onClick={() => showTodos("취소")}>
            취소됨 <span className="ml-2">({todos.취소.length})</span>
          </h2>
        </div>
      </div>

  

      <div className="mt-6">
        <h3 className="text-left text-md font-bold text-gray-800"> ✔︎ {currentStatus} 리스트</h3>
        <ul className="mx-auto mt-2 max-w-full space-y-4">
          {currentTodos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white py-2 px-4 shadow">
              <span className="text-sm text-gray-500 font-bold">
                {todo.todo} - {formatDate(todo.date)}
              </span>
              <div className="flex space-x-4">
                {currentStatus === "진행중" && (
                  <>
                    <button
                      onClick={() => handleCompleteTodo(index)}
                      className="rounded-full bg-gray-500 px-4 py-[6px] text-white text-sm transition hover:bg-gray-200">
                      완료
                    </button>
                    <button
                      onClick={() => handleCancelTodo(index)}
                      className="rounded-full bg-red-500 px-4 py-[6px] text-white text-sm transition hover:bg-red-600">
                      취소
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 mb-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mr-2 h-6 w-6 rounded-full text-sm text-black font-bold transition hover:bg-gray-300 ${
                currentPage === index + 1 ? "ring-4 ring-gray-200" : ""
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
