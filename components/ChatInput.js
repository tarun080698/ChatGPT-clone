"use client";
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

function ChatInput({ id }) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  // useSWR to get models
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendChat = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(db, "users", session?.user?.email, "chats", id, "messages"),
      message
    );

    // toast notification

    const notification = toast.loading("Generating response...");
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        id,
        model,
        session,
      }),
    }).then(() => {
      toast.success("Response generated!", {
        id: notification,
      });
    });
  };
  return (
    <div className="bg-[#202123] text-gray-400 rounded-sm text-sm focus:outline-none shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]">
      <form className="p-4 space-x-5 flex" onSubmit={sendChat}>
        <input
          className="bg-transparent focus:outline-none flex-1 text-white disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          placeholder="Send a message"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11a37f] opacity-60 hover:opacity-100 font-bold text-white px-2 py-1 rounded disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
