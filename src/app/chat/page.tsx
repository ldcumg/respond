"use client";

import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import Link from "next/link";

type Room = {
  id: number;
  name: string;
  created_by: string;
  participants: string[];
};

type User = {
  id: string;
  nickname: string;
};

const ChatPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [participantNicknames, setParticipantNicknames] = useState<{ [key: string]: string }>({});

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    const { data, error } = await browserClient.from("user_info").select("*");
    if (error) {
      console.error("사용자 목록 가져오기 오류:", error);
    } else {
      setUsers(data);
    }
  };

  // 방 목록 가져오기
  const fetchRooms = async () => {
    const user = await browserClient.auth.getUser();
    if (user.data.user) {
      const userId = user.data.user.id;

      const { data, error } = await browserClient.from("rooms").select("*").contains("participants", [userId]); // 참가자인 방만 조회 필터링

      if (error) {
        console.error("방 목록 가져오기 오류:", error);
      } else {
        setRooms(data);
        await fetchParticipantNicknames(data); // 참가자 닉네임 가져오기
      }
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUsers();
  }, []);

  // 참가자 닉네임 가져오기
  const fetchParticipantNicknames = async (rooms: Room[]) => {
    const participantIds = rooms.flatMap((room) => room.participants); // 모든 참가자 ID 가져오기

    console.log("모든 참가자 아이디:", participantIds);

    const { data, error } = await browserClient.from("user_info").select("nickname, id").in("id", participantIds);
    if (error) {
      console.error("참가자 닉네임 가져오기 오류:", error);
    } else {
      const nicknames = data.reduce((acc: { [key: string]: string }, user: { nickname: string; id: string }) => {
        acc[user.id] = user.nickname;
        return acc;
      }, {});
      setParticipantNicknames(nicknames); // 참가자 닉네임 저장
    }
  };

  // 방 추가
  const handleAddRoom = async () => {
    if (newRoomName.trim() && selectedParticipants.length > 0) {
      const user = await browserClient.auth.getUser();
      if (user.data.user) {
        const { error } = await browserClient.from("rooms").insert({
          name: newRoomName,
          participants: [user.data.user.id, ...selectedParticipants],
          created_by: user.data.user.id // 방 생성자 ID
        });

        if (error) {
          console.error("채팅방 추가 중 오류 발생:", error);
        } else {
          setNewRoomName("");
          setSelectedParticipants([]);
          setShowForm(false);
          fetchRooms();
        }
      }
    }
  };

  // 선택된 참가자 목록에 추가하거나 제거하는 역할
  const handleSelectParticipant = (userId: string): void => {
    setSelectedParticipants((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  return (
    <>
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <h2 className="mr-2 text-2xl font-bold">새 채팅방 추가</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
          >
            +
          </button>
        </div>
        {showForm && (
          <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="새 방 이름"
              className="mb-4 w-full rounded border px-4 py-2"
            />
            <h3 className="mb-2 text-xl">초대할 참가자 선택</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="사용자 검색..."
              className="mb-2 w-full border p-2"
            />
            <ul className="mb-4 max-h-40 overflow-y-auto rounded border">
              {users
                .filter((user) => user.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                  <li key={user.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(user.id)}
                      onChange={() => handleSelectParticipant(user.id)}
                      className="mr-2"
                    />
                    {user.nickname}
                  </li>
                ))}
            </ul>
            <button
              onClick={handleAddRoom}
              disabled={selectedParticipants.length === 0}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              추가하기
            </button>
          </div>
        )}
        <h1 className="mt-6 text-2xl">채팅방 목록</h1>
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={{
              pathname: `/chat/${room.id}`
            }}
          >
            <button className="mt-2 rounded bg-gray-200 px-4 py-2">
              {room.name} ({room.participants.map((id) => participantNicknames[id]).join(", ")})
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};
export default ChatPage;
