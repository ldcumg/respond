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
};

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState<string>("");

  // chat 데이터 불러오기
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
        data.map(async (chat) => {
          const { data: userData } = await browserClient
            .from("user_info")
            .select("nickname")
            .eq("id", chat.user_id)
            .single();
          return {
            ...chat,
            user_nickname: userData?.nickname
          };
        })
      );
      setMessages(messagesWithNicknames);
    }
  };

  // 방 정보 가져오기, 실시간, 메세지 빈배열 만들기
  useEffect(() => {
    const fetchRoomDetails = async () => {
      const { data: roomData, error: roomError } = await browserClient
        .from("rooms")
        .select("name")
        .eq("id", roomId)
        .single();

      if (roomError) {
        console.error("룸 정보 가져오기 오류:", roomError.message);
      } else {
        setSelectedRoomName(roomData.name);
      }
    };

    if (roomId) {
      fetchMessages();
      fetchRoomDetails();

      // Realtime 실시간
      const subscription = browserClient
        .channel(`chat:room_id=eq.${roomId}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat" }, (payload) => {
          const newMessage: Message = {
            id: payload.new.id,
            content: payload.new.content,
            user_id: payload.new.user_id,
            room_id: payload.new.room_id,
            created_at: payload.new.created_at,
            user_nickname: payload.new.user_nickname
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [roomId]);

  const handleSendMessage = async () => {
    const user = await browserClient.auth.getUser();
    if (newMessage.trim() && user.data.user && roomId) {
      const { data: userData, error: userError } = await browserClient
        .from("user_info")
        .select("nickname")
        .eq("id", user.data.user.id)
        .single();
      if (userError) {
        console.error("유저 닉네임 가져오기 오류:", userError.message);
        return;
      }

      // chat 데이터 삽입
      const { error } = await browserClient.from("chat").insert({
        content: newMessage,
        user_id: user.data.user.id,
        room_id: roomId,
        user_nickname: userData?.nickname,
        created_at: new Date().toISOString()
      });

      if (error) {
        console.error("메시지 전송 중 오류 발생:", error);
      } else {
        setNewMessage(""); // 메시지 입력 초기화
      }
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <h2 className="text-md mb-4 font-bold">현재 채팅방: {selectedRoomName}</h2>
        <div className="h-[280px] rounded-lg bg-gray-100 p-4 shadow-md">
          {messages.map((message) => (
            <div key={message.id} className="mb-2 flex justify-end">
              <div className="rounded-md bg-white p-2 shadow-md">
                <strong className="text-black">{message.user_nickname}</strong>
                <span>{message.content}</span>
                <div className="text-sm text-gray-500">{message.created_at}</div>
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
};

export default ChatRoom;
