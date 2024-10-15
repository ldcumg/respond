import React from "react";

type Message = {
  id: number;
  content: string;
  user_id: string;
  room_id: string;
  created_at: string;
};

const MessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="message">
      <p>{message.content}</p>
      <span>{new Date(message.created_at).toLocaleString()}</span>
    </div>
  );
};

export default MessageComponent;
