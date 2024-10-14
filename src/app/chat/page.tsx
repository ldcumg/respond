// "use client";

// import { useEffect, useState } from "react";
// import browserClient from "@/utils/supabase/client"; // Supabase 클라이언트
// import { useRouter } from "next/navigation";

// type Room = {
//   id: number;
//   name: string;
// };

// type Message = {
//   id: number;
//   content: string;
//   user_id: string;
//   room_id: number;
//   created_at: string;
//   user_nickname: string;
// };

// export default function ChatPage() {
//   const router = useRouter();
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [roomId, setRoomId] = useState<number | null>(null);
//   const [selectedRoomName, setSelectedRoomName] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [newRoomName, setNewRoomName] = useState("");
//   const [error, setError] = useState<string>(""); // 에러 상태 추가

//   // 방 목록 가져오기
//   const fetchRooms = async () => {
//     const { data, error } = await browserClient.from("rooms").select("*");
//     if (error) {
//       console.error("방 목록 가져오기 오류:", error);
//       setError("방 목록을 가져오는 데 실패했습니다.");
//     } else {
//       setRooms(data);
//     }
//   };

//   // 특정 방의 메시지 가져오기
//   useEffect(() => {
//     if (roomId !== null) {
//       fetchMessages();
//     }
//   }, [roomId]);

//   const fetchMessages = async () => {
//     if (roomId) {
//       const { data, error } = await browserClient
//         .from("chat")
//         .select("*, user_info!chat_user_id_fkey(nickname)")
//         .eq("room_id", roomId)
//         .order("created_at", { ascending: true });

//       if (error) {
//         console.error("메시지 가져오기 오류:", error);
//         setError("메시지를 가져오는 데 실패했습니다.");
//       } else {
//         setMessages(data);
//       }
//     }
//   };

//   // 메시지 전송
//   const handleSendMessage = async () => {
//     const user = await browserClient.auth.getUser();
//     if (newMessage.trim() && user.data.user && roomId !== null) {
//       const userInfo = await browserClient
//         .from("user_info")
//         .select("nickname")
//         .eq("user_id", user.data.user.id)
//         .single();

//       if (userInfo.error) {
//         console.error("닉네임 가져오기 오류:", userInfo.error);
//         setError("닉네임을 가져오는 데 실패했습니다.");
//         return; // 닉네임을 가져오지 못했으면 전송하지 않음
//       }

//       const { error } = await browserClient.from("chat").insert({
//         content: newMessage,
//         user_id: user.data.user.id,
//         room_id: roomId,
//         user_nickname: userInfo.data?.nickname
//       });

//       if (error) {
//         console.error("메시지 전송 중 오류 발생:", error);
//         setError("메시지를 전송하는 데 실패했습니다.");
//       } else {
//         setNewMessage("");
//         fetchMessages();
//       }
//     }
//   };

//   // 방 추가
//   const handleAddRoom = async () => {
//     if (newRoomName.trim()) {
//       const { error } = await browserClient.from("rooms").insert({
//         name: newRoomName
//       });

//       if (error) {
//         console.error("채팅방 추가 중 오류 발생:", error);
//         setError("채팅방을 추가하는 데 실패했습니다.");
//       } else {
//         setNewRoomName("");
//         fetchRooms();
//       }
//     }
//   };

//   return (
//     <div>
//       {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 표시 */}
//       {!roomId ? (
//         <div>
//           <h2>새 채팅방 추가</h2>
//           <input
//             type="text"
//             value={newRoomName}
//             onChange={(e) => setNewRoomName(e.target.value)}
//             placeholder="새 방 이름"
//           />
//           <button onClick={handleAddRoom}>방 추가</button>
//           <h1>채팅방 목록</h1>
//           {rooms.map((room) => (
//             <div key={room.id}>
//               <button
//                 onClick={() => {
//                   setRoomId(room.id);
//                   setSelectedRoomName(room.name);
//                   router.push(`/chat/${room.id}`);
//                 }}>
//                 {room.name}
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           <h2>방 이름: {selectedRoomName}</h2>
//           <div className="chat-messages">
//             {messages.map((message) => (
//               <div key={message.id}>
//                 <strong>{message.user_nickname}: </strong>
//                 {message.content}
//               </div>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="메시지를 입력하세요"
//           />
//           <button onClick={handleSendMessage}>전송</button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client"; // Supabase 클라이언트
import { useRouter } from "next/navigation";
import ChatRoom from "./[roomId]/page";

type Room = {
  id: number;
  name: string;
  participants: string[]; // 참가자 ID 배열 추가
};

type User = {
  id: string;
  nickname: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [showForm, setShowForm] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null);

  const [newRoomName, setNewRoomName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]); // 참가자 상태 추가

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    const { data, error } = await browserClient.from("user_info").select("*");
    if (error) {
      console.error("사용자 목록 가져오기 오류:", error);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 방 목록 가져오기
  const fetchRooms = async () => {
    const { data, error } = await browserClient.from("rooms").select("*");
    if (error) {
      console.error("방 목록 가져오기 오류:", error);
    } else {
      setRooms(data);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUsers();
  }, []);

  // 방 추가
  const handleAddRoom = async () => {
    if (newRoomName.trim() && selectedParticipants.length > 0) {
      const user = await browserClient.auth.getUser();
      if (user.data.user) {
        const { error } = await browserClient.from("rooms").insert({
          name: newRoomName,
          participants: [user.data.user.id, ...selectedParticipants]
        });

        if (error) {
          console.error("채팅방 추가 중 오류 발생:", error);
        } else {
          setNewRoomName("");
          setSelectedParticipants([]); // 초대된 참가자 초기화
          setShowForm(false); // 폼 제출 후 숨김
          fetchRooms();
        }
      }
    }
  };

  // 방 입장 시 참가자 확인
  const fetchParticipants = async (roomId: number) => {
    const { data, error } = await browserClient.from("rooms").select("participants").eq("id", roomId).single();

    if (error) {
      console.error("참가자 가져오기 오류:", error);
    } else {
      const participantIds = data.participants || []; // 참가자 ID 가져오기
      const participantUsers = await Promise.all(
        participantIds.map(async (id: string) => {
          const { data: userData } = await browserClient
            .from("user_info")
            .select("nickname")
            .eq("user_id", id)
            .single();
          return userData?.nickname || id; // 닉네임이 없으면 ID를 반환
        })
      );

      setParticipants(participantUsers); // 참가자 상태 업데이트
    }
  };

  // 선택된 참가자 목록에 추가하거나 제거하는 역할
  const handleSelectParticipant = (userId: string): void => {
    setSelectedParticipants((prevSelected) => {
      if (prevSelected.includes(userId)) {
        // 이미 선택된 참가자일 경우 제거
        return prevSelected.filter((id) => id !== userId);
      } else {
        // 새로 선택된 참가자일 경우 추가
        return [...prevSelected, userId];
      }
    });
  };

  return (
    <>
      {!roomId ? (
        <div className="p-4">
          <div className="mb-4 flex items-center">
            <h2 className="mr-2 text-2xl font-bold">새 채팅방 추가</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
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
                className="rounded bg-green-500 px-4 py-2 text-white">
                추가하기
              </button>
            </div>
          )}
          <h1 className="mt-6 text-2xl">채팅방 목록</h1>
          {rooms.map((room) => (
            <div key={room.id}>
              <button
                onClick={() => {
                  setRoomId(room.id);
                  setSelectedRoomName(room.name);
                  fetchParticipants(room.id); // 참가자 가져오기
                  router.push(`/chat/${room.id}`);
                }}
                className="mt-2 rounded bg-gray-300 px-4 py-2">
                {room.name}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ChatRoom selectedRoomName={selectedRoomName} />
      )}
    </>
  );
}
