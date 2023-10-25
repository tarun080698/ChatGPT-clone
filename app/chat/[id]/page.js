import ChatInput from "@/components/ChatInput";
import Chat from "@/components/chat";
import React from "react";

function ChatPage({ params: { id } }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat id={id} />
      <ChatInput id={id} />
    </div>
  );
}

export default ChatPage;
