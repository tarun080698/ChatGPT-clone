"use client";
import React from "react";
import parse from "html-react-parser";

function Message({ message }) {
  const isChatGPT = message?.user?.name === "ChatGPT";
  return (
    <div
      className={`py-5 text-white ${
        isChatGPT ? "bg-[#434654]" : ""
      } flex space-x-5 px-10 `}
    >
      <img
        src={message?.user?.avatar}
        alt="user_profile"
        className="h-8 w-8 "
      />
      <div className="max-w-2xl mx-auto pt-1 text-base">
        {isChatGPT ? parse(message?.text) : message?.text}
      </div>
    </div>
  );
}

export default Message;
