// // LogOutButton.tsx 수정
// import { useRouter } from "next/navigation";
// import browserClient from "@/utils/supabase/client";
// import { useAuthStore } from "@/store/useAuthStore"; // 추가

// interface LogOutButtonProps {
//   isLoggedIn: boolean;
// }

// const LogOutButton: React.FC<LogOutButtonProps> = ({ isLoggedIn }) => {
//   const router = useRouter();
//   const { setIsLoggedIn } = useAuthStore(); // 상태 업데이트 함수

//   const handleLogout = async () => {
//     await browserClient.auth.signOut(); // Supabase 로그아웃
//     document.cookie = "supabaseSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 쿠키 삭제
//     setIsLoggedIn(false); // 로그아웃 상태로 변경
//     router.push("/login"); // 로그인 페이지로 이동
//   };

//   const handleLoginRedirect = () => {
//     router.push("/login"); // 로그인 페이지로 이동
//   };

//   return (
//     <button
//       type="button"
//       className={`w-full rounded border-4 ${isLoggedIn ? "border-red-600 bg-red-600" : "border-black bg-black"} p-2 text-white hover:invert`}
//       onClick={isLoggedIn ? handleLogout : handleLoginRedirect}>
//       {isLoggedIn ? "로그아웃" : "로그인"}
//     </button>
//   );
// };

// export default LogOutButton;
// "use client";
// import { useAuthStore } from "@/store/useUserInfoStore";
// import browserClient from "@/utils/supabase/client"; // Supabase 클라이언트 가져오기
// import { useRouter } from "next/navigation";

// const LogOutButton = () => {
//   const { isLoggedIn, setIsLoggedIn } = useAuthStore(); // 로그인 상태를 가져오고 업데이트하는 훅
//   const router = useRouter();
//   console.log(isLoggedIn);

//   const handleLogout = async () => {
//     await browserClient.auth.signOut(); // Supabase에서 로그아웃 수행
//     document.cookie = "supabaseSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 쿠키 삭제
//     setIsLoggedIn(false); // Zustand 스토어에서 로그인 상태 업데이트
//     router.push("/login"); // 로그아웃 후 로그인 페이지로 이동
//   };

//   return (
//     <button
//       type="button"
//       className={`w-full rounded border-4 ${isLoggedIn ? "border-red-600 bg-red-600" : "border-black bg-black"} p-2 text-white hover:invert`}
//       onClick={isLoggedIn ? handleLogout : () => router.push("/login")}>
//       {isLoggedIn ? "로그아웃" : "로그인"}
//     </button>
//   );
// };

// export default LogOutButton;

"use client";
import { useLoggedIn } from "@/hooks/useLoggedIn"; // useLoggedIn 훅 가져오기
import browserClient from "@/utils/supabase/client"; // Supabase 클라이언트 가져오기
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const isLoggedIn = useLoggedIn(); // 훅을 사용하여 로그인 상태 가져오기
  const router = useRouter();

  const handleLogout = async () => {
    await browserClient.auth.signOut(); // Supabase에서 로그아웃 수행
    document.cookie = "supabaseSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 쿠키 삭제
    router.push("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <button
      type="button"
      className={`w-full rounded border-4 ${isLoggedIn ? "border-red-600 bg-red-600" : "border-black bg-black"} p-2 text-white hover:invert`}
      onClick={isLoggedIn ? handleLogout : () => router.push("/login")}>
      {isLoggedIn ? "로그아웃" : "로그인"}
    </button>
  );
};

export default LogOutButton;
