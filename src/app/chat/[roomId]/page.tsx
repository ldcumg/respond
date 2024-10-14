"use client";

import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import { useParams } from "next/navigation";

type Message = {
  id: number;
  content: string;
  user_id: string;
  room_id: number;
  created_at: string;
  user_nickname: string;
  timestamp: number;
};

export default function ChatRoom(selectedRoomName) {
  const { roomId } = useParams(); // URL에서 roomId 가져오기
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (roomId) {
      fetchMessages();
    }
  }, [roomId]);
  console.log("Room ID:", roomId);

  const fetchMessages = async () => {
    const { data, error } = await browserClient
      .from("chat")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("메시지 가져오기 오류:", error.message);
    } else {
      const messagesWithNicknames = await Promise.all(
        data.map(async (message) => {
          const { data: userData } = await browserClient
            .from("user_info")
            .select("nickname")
            .eq("user_id", message.user_id)
            .single();
          return {
            ...message,
            user_nickname: userData?.nickname
          };
        })
      );
      setMessages(messagesWithNicknames);
    }
  };

  const handleSendMessage = async () => {
    const user = await browserClient.auth.getUser();
    if (newMessage.trim() && user.data.user && roomId) {
      const currentTime = new Date().toLocaleTimeString(); // 현재 시간 가져오기
      const { error } = await browserClient.from("chat").insert({
        content: newMessage,
        user_id: user.data.user.id,
        room_id: roomId
      });

      if (error) {
        console.error("메시지 전송 중 오류 발생:", error);
      } else {
        setNewMessage(""); // 메시지 입력 초기화
        fetchMessages(); // 새로운 메시지 전송 후 메시지 목록 업데이트
      }
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <h2 className="text-md mb-4 font-bold">
          {selectedRoomName ? `현재 채팅방: ${selectedRoomName}` : "채팅방을 선택하세요."}
        </h2>
        <div className="h-[280px] rounded-lg bg-gray-100 p-4 shadow-md">
          {messages.map((message) => (
            <div key={message.id} className="mb-2 flex justify-end">
              <div className="rounded-md bg-white p-2 shadow-md">
                <strong className="text-black">{message.user_nickname}</strong>
                <span>{message.content}</span>
                <div className="text-sm text-gray-500">{message.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-row">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="mr-2 flex-1 rounded-md border border-gray-300 p-2"
        />
        <button
          onClick={handleSendMessage}
          className="font-md w-[80px] rounded-full border-[3px] border-black bg-black px-4 py-2 text-white transition hover:bg-white hover:font-bold hover:text-black">
          전송
        </button>
      </div>
    </div>
  );
}
