"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 기본 스타일 가져오기
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    toast.error(
      <div className="flex flex-row items-center justify-between">
        <p className="text-gray-800 dark:text-gray-200">{error.message}</p>
        <button
          onClick={() => router.push("/")}
          className="ml-2 line-clamp-1 block w-[80px] rounded-lg bg-blue-500 px-2 py-2 text-xs text-white transition hover:bg-blue-600">
          홈으로 가기
        </button>
      </div>,
      {
        autoClose: false, // 자동으로 닫히지 않도록 설정
        hideProgressBar: false, // 진행 바 숨기기
        closeOnClick: false, // 클릭 시 닫히지 않도록 설정
        pauseOnHover: true, // 마우스 오버 시 일시 정지
        draggable: true, // 드래그 가능
        progress: undefined, // 진행 상태
        className: "bg-white border border-gray-300 dark:bg-gray-800 dark:border-none"
      }
    );
  }, [error]);

  return (
    <>
      <ToastContainer
        position="top-right"
        style={{ marginTop: "60px" }}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
