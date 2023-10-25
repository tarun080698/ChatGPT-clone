import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email, "chats"),
      {
        userId: session.user?.email,
        createdAt: serverTimestamp(),
      }
    );
    setTimeout(router.push(`/chat/${doc.id}`), 2000);
  };
  return (
    <div
      className="border-gray-700 border mb-2 rounded-lg p-4 text-sm flex items-center justify-center space-x-2 hover:bg-gray-700/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out;"
      onClick={createNewChat}
    >
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
