import browserClient from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Room = {
  id: number;
  name: string;
  created_by: string;
  participants: string[];
};

type User = {
  id: string;
  nickname: string;
  email?: string;
};

const ChatPrev = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [participantNicknames, setParticipantNicknames] = useState<{ [key: string]: string }>({});
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await browserClient.from("user_info").select("*");
      if (data) {
        setUsers(data); // data가 null이 아닐 때만 설정
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 방 목록 가져오기
  const fetchRooms = async () => {
    try {
      const user = await browserClient.auth.getUser();
      const id = user.data.user?.id;
      setUserId(id);
      if (id) {
        const { data } = await browserClient.from("rooms").select("*").contains("participants", [id]); // 참가자인 방만 조회 필터링
        if (data) {
          setRooms(data); // data가 null이 아닐 때만 설정
          await fetchParticipantNicknames(data); // 참가자 닉네임 가져오기
        }
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchRooms(), fetchUsers()]);
    };

    fetchData();
  }, [userId]);

  const fetchParticipantNicknames = async (rooms: Room[]) => {
    const participantIds = rooms.flatMap((room) => room.participants);

    try {
      const { data } = await browserClient.from("user_info").select("nickname, id").in("id", participantIds);
      if (data) {
        // data가 null이 아닐 때만 처리
        const nicknames = data.reduce((acc: { [key: string]: string }, user: { nickname: string; id: string }) => {
          acc[user.id] = user.nickname;
          return acc;
        }, {});
        setParticipantNicknames(nicknames);
      }
    } catch (error) {
      console.error("Error fetching participant nicknames:", error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <h1 className="mt-4 text-2xl font-bold text-black">채팅방 목록</h1>
      <div className="mt-4 space-y-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="mb-2 w-full cursor-pointer rounded-lg border-[4px] border-black bg-gray-200 px-6 py-4 shadow-lg hover:bg-gray-100">
              <Link href={`/${userId}/chat/${room.id}`}>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{room.name}</span>
                  <div className="flex items-center">
                    <span className="font-sm mx-4 font-normal text-gray-600">
                      {room.participants
                        .filter((id) => participantNicknames[id])
                        .map((id) => participantNicknames[id])
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">채팅방이 없습니다.</p> // 방이 없는 경우 메시지
        )}
      </div>
    </div>
  );
};

export default ChatPrev;
