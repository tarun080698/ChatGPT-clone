"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon, SunIcon } from "@heroicons/react/24/outline";
import Loading from "./loading";

function Chat({ id }) {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div
      className={`${
        loading ? "flex" : ""
      } flex-1 overflow-y-auto overflow-x-hidden`}
    >
      {loading ? (
        <Loading />
      ) : messages?.docs.length > 0 ? (
        messages?.docs?.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))
      ) : (
        <div className="text-white flex justify-center my-[10%] flex-col items-center space-y-5">
          <div className="animate-pulse">
            Get started by typing a prompt below...
          </div>
          <ArrowDownCircleIcon className="h-10 w-10 animate-bounce" />
        </div>
      )}
    </div>
  );
}

export default Chat;
