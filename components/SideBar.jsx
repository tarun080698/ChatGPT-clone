"use client";
import classNames from "classnames";
import React, { useState } from "react";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatListItem from "./ChatListItem";
import ModelSelection from "./ModelSelection";
import Loading from "./loading";

function SideBar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const collapseIconClasses = classNames("p-4 rounded bg-light-lighter", {
    "rotate-180": toggleCollapse,
  });

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={`p-2 flex flex-col h-screen overflow-hidden bg-light justify-between transition-width ease-in-out duration-300 ${
        toggleCollapse ? "w-20" : "w-full"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          {!toggleCollapse && <NewChat />}
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <ChevronDoubleLeftIcon className="text-[#cfd1e6] w-6 h-6" />
          </button>
          {/* )} */}
        </div>
        {!toggleCollapse && (
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
        )}
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
              <ChatListItem
                key={chat.id}
                chat={chat}
                toggleCollapse={toggleCollapse}
              />
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

            {!toggleCollapse && (
              <div className="text-gray-300 font-bold">
                {session?.user?.name}
              </div>
            )}
          </div>
          {!toggleCollapse && (
            <div onClick={() => signOut()}>
              <ArrowLeftOnRectangleIcon className="h-12 w-6 mr-2 text-white cursor-pointer opacity-50 hover:opacity-100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideBar;
