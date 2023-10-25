import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function ChatListItem({ chat }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email, "chats", chat?.id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(chat.id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email, "chats", chat.id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={`chatRow ${active && "bg-gray-700"} mt-[4px]`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New chat"}
      </p>
      {active && (
        <TrashIcon
          onClick={removeChat}
          className="h-5 w-5 text-gray-200
         hover:text-red-700"
        />
      )}
    </Link>
  );
}
