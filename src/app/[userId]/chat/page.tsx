"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, MessageCirclePlus, Trash2 } from "lucide-react"; // 삭제 아이콘 추가
import { useRouter } from "next/navigation";
import browserClient from "@/utils/supabase/client";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import GlobalError from "@/app/GlobalError";

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

const ChatPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [participantNicknames, setParticipantNicknames] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    try {
      const { data, error } = await browserClient.from("user_info").select("*");

      if (error) {
        throw new Error("사용자 목록 가져오기 오류: " + error.message);
      }

      setUsers(data);
    } catch (error) {
      setError(new Error("사용자 목록 가져오기 중 오류 발생"));
    }
  };

  // 방 목록 가져오기
  const fetchRooms = async () => {
    const user = await browserClient.auth.getUser();
    const id = user.data.user?.id;
    setUserId(id);
    if (id) {
      const { data, error } = await browserClient.from("rooms").select("*").contains("participants", [id]); // 참가자인 방만 조회 필터링
      if (error) {
        setError(new Error("방 목록 가져오기 오류"));
      } else {
        setRooms(data);
        await fetchParticipantNicknames(data); // 참가자 닉네임 가져오기
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchRooms(), fetchUsers()]);
      } catch (error) {
        setError(new Error("데이터를 가져오는 동안 오류가 발생했습니다."));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // 참가자 닉네임 가져오기
  const fetchParticipantNicknames = async (rooms: Room[]) => {
    const participantIds = rooms.flatMap((room) => room.participants); // 모든 참가자 ID 가져오기

    const { data, error } = await browserClient.from("user_info").select("nickname, id").in("id", participantIds);
    if (error) {
      setError(new Error("참가자 닉네임 가져오기 오류"));
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
          setError(new Error("채팅방 추가 중 오류 발생"));
        } else {
          setNewRoomName("");
          setSelectedParticipants([]);
          setShowForm(false);
          fetchRooms();
        }
      }
    }
  };

  // 방 삭제
  const handleDeleteRoom = async (roomId: number) => {
    try {
      const { error } = await browserClient.from("rooms").delete().eq("id", roomId);
      if (error) {
        setError(new Error("채팅방 삭제 중 오류 발생"));
      } else {
        fetchRooms(); // 방 목록 갱신
      }
    } catch (error) {
      setError(new Error("채팅방 삭제 중 오류 발생"));
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

  const handleGoBack = () => {
    router.back();
  };

  // 로딩 중일 때 로딩 스피너 표시
  if (loading) {
    return <LoadingSpinner />;
  }

  // 에러 발생 시 에러 표시
  if (error) {
    return <GlobalError error={error} />;
  }

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-200">
      <div className="flex h-[60px] items-center border-b-[4px] border-black bg-white p-4">
        <div className="cursor-pointer" onClick={handleGoBack}>
          <ChevronLeft size={40} strokeWidth={2} />
        </div>
        <h2 className="grow text-center text-xl font-black text-gray-800">내 채팅</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex hover:text-gray-500">
          <MessageCirclePlus size={36} strokeWidth={2.5} />
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="m-auto flex w-full min-w-[400px] max-w-lg flex-col rounded-lg bg-white p-6 shadow-lg">
            <h3 className="py-4 text-center text-lg font-bold">새 채팅방 추가</h3>
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="새 방 이름"
              className="mb-4 w-full rounded border px-4 py-2"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="닉네임으로 검색"
              className="mb-2 w-full border p-2 px-4"
            />
            <ul className="mb-4 max-h-40 overflow-y-auto rounded border">
              {users
                .filter((user) => user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== userId)
                .map((user) => (
                  <li key={user.id} className="flex items-center border-b border-gray-200 px-6 py-2">
                    <p className="grow">{user.nickname}</p>
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(user.id)}
                      onChange={() => handleSelectParticipant(user.id)}
                      className="ml-2 flex-none"
                    />
                  </li>
                ))}
            </ul>
            <button
              onClick={handleAddRoom}
              disabled={selectedParticipants.length === 0}
              className="rounded-full bg-black px-5 py-3 font-semibold text-white">
              초대하기
            </button>
            <button onClick={() => setShowForm(false)} className="mt-4 font-bold text-red-500">
              닫기
            </button>
          </div>
        </div>
      )}

      <div className="flex h-full flex-col p-6">
        <h1 className="mt-4 text-2xl font-bold text-black">채팅방 목록</h1>
        <div className="mt-4 space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="mb-2 w-full rounded-lg border-[4px] border-black bg-white px-6 py-4 shadow-lg hover:bg-white hover:shadow-xl">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
