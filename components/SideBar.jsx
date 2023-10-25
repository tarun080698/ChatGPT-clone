"use client";
import React from "react";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ArrowLeftOnRectangleIcon, SunIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatListItem from "./ChatListItem";
import ModelSelection from "./ModelSelection";
import Loading from "./loading";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen overflow-hidden">
      <div>
        <NewChat />
        <div className="hidden sm:inline">
          <ModelSelection />
        </div>
      </div>
      <div
        className={`${
          loading ? "flex" : ""
        } flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto`}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-y-hidden">
            {chats?.docs?.map((chat) => (
              <ChatListItem key={chat.id} chat={chat} />
            ))}
          </div>
        )}
      </div>

      {session && (
        <div className="flex justify-between mt-2 my-auto py-2 mx-[-8px]">
          <div className="flex items-center justify-center">
            <img
              src={session.user?.image}
              alt="user_profile"
              className="h-8 w-8 rounded-full cursor-pointer mx-4 hover:opacity-50"
            />

            <div className="text-gray-300 font-bold">{session?.user?.name}</div>
          </div>
          <div onClick={() => signOut()}>
            <ArrowLeftOnRectangleIcon className="h-12 w-6 mr-2 text-white cursor-pointer opacity-50 hover:opacity-100" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
