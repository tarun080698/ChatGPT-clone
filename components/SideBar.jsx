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
  const [isCollapsible, setIsCollapsible] = useState(false);
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const wrapperClasses = classNames(
    "p-2 flex flex-col h-screen overflow-hidden bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );
  const collapseIconClasses = classNames("p-4 rounded bg-light-lighter", {
    "rotate-180": toggleCollapse,
  });

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      // className="p-2 flex flex-col h-screen overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between">
          {!toggleCollapse && <NewChat />}
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronDoubleLeftIcon className="text-[#cfd1e6] w-6 h-6" />
            </button>
          )}
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

            {!toggleCollapse && (
              <div className="text-gray-300 font-bold">
                {session?.user?.name}
              </div>
            )}
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
