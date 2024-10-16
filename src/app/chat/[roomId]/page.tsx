"use client";

import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import GlobalError from "@/app/GlobalError";

type Message = {
  id: number;
  content: string;
  user_id: string;
  room_id: number;
  created_at: string;
  user_nickname: string;
};

type User = {
  id: string;
  nickname: string;
};

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  // 현재 로그인한 사용자의 정보 가져오기
  const fetchUser = async () => {
    try {
      const { data, error } = await browserClient.auth.getUser();

      if (error || !data?.user) {
        throw new Error("사용자 정보를 가져오는 중 오류: " + error?.message);
      }

      setUser({
        id: data.user.id,
        nickname: data.user.user_metadata?.nickname
      });
    } catch (error) {
      setError(new Error("사용자 목록 가져오기 중 오류 발생"));
    }
  };

  // chat 데이터 불러오기
  const fetchMessages = async () => {
    try {
      const { data, error } = await browserClient
        .from("chat")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (error) {
        throw new Error("메시지 가져오기 오류: " + error?.message);
      } else if (!data) {
        throw new Error("메시지가 없습니다.");
      }

      const messagesWithNicknames = await Promise.all(
        data.map(async (chat) => {
          const { data: userData, error: userError } = await browserClient
            .from("user_info")
            .select("nickname")
            .eq("id", chat.user_id)
            .single();

          return {
            ...chat,
            user_nickname: userError ? "Unknown" : userData?.nickname
          };
        })
      );

      setMessages(messagesWithNicknames);
    } catch (error) {
      setError(new Error("메세지 가져오기 중 오류 발생"));
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomDetails = async () => {
    try {
      const { data, error } = await browserClient.from("rooms").select("name").eq("id", roomId).single();

      if (error) {
        throw new Error("채팅방 정보 가져오기 오류: " + error.message);
      }

      setSelectedRoomName(data?.name || "채팅방 이름이 없습니다!");
    } catch (error) {
      setError(new Error("채팅방 정보 가져오기 중 오류 발생"));
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchUser();
      fetchMessages();
      fetchRoomDetails();

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
    if (newMessage.trim() && user && roomId) {
      try {
        const { data: userData, error: userError } = await browserClient
          .from("user_info")
          .select("nickname")
          .eq("id", user.id)
          .single();

        if (userError) {
          throw new Error("유저 닉네임 가져오기 오류: " + userError.message);
        }

        const { error: sendError } = await browserClient.from("chat").insert({
          content: newMessage,
          user_id: user.id,
          room_id: roomId,
          user_nickname: userData?.nickname,
          created_at: new Date().toISOString()
        });

        if (sendError) {
          throw new Error("메시지 전송 중 오류 발생: " + sendError.message);
        } else {
          setNewMessage("");
        }
      } catch (error) {
        setError(new Error("메시지 전송 중 오류 발생"));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage();
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return <LoadingSpinner />;
  }

  // 오류가 발생했을 때 GlobalError 컴포넌트 렌더링
  if (error) {
    return <GlobalError error={error} />;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-[80px] items-center border-b-[10px] border-black bg-white p-9">
        <div className="cursor-pointer" onClick={handleGoBack}>
          <ChevronLeft size={40} strokeWidth={3} />
        </div>
        <h2 className="grow text-center text-xl font-black text-gray-800">{selectedRoomName}</h2>
      </div>

      <div className="flex-grow overflow-y-auto bg-gray-200 p-8">
        {messages.map((message, index) => {
          const isFirstMessageFromUser = index === 0 || messages[index - 1].user_id !== message.user_id;

          return (
            <div
              key={message.id}
              className={`mb-2 flex ${message.user_id === user?.id ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-center ${message.user_id === user?.id ? "flex-row-reverse" : ""}`}>
                <div className={`flex flex-col ${message.user_id === user?.id ? "items-end" : "items-start"}`}>
                  {isFirstMessageFromUser && <h3 className="mb-1 font-bold">- {message.user_nickname}</h3>}
                  <div
                    className={`flex max-w-md items-center rounded-md px-4 py-2 shadow-md ${
                      message.user_id === user?.id ? "border-4 border-black bg-white text-black" : "bg-white text-black"
                    }`}>
                    <p className="flex-1">{message.content}</p>
                  </div>
                  <span className="mt-1 px-2 text-xs text-gray-400">
                    {moment.utc(message.created_at).tz("Asia/Seoul").format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex h-[80px] items-center bg-white p-9">
        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 left-0 right-0 mb-2 flex flex-row items-center gap-4 bg-white p-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="ml-4 h-[54px] flex-1 rounded-full border-[6px] border-black px-6 focus:shadow-xl focus:outline-none"
          />
          <button
            type="submit"
            className="mr-4 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[6px] border-black hover:bg-gray-200">
            <ArrowUpRight size={32} strokeWidth={3} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
