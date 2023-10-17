import admin from "firebase-admin";
import query from "@/lib/queryApi";
import { adminDb } from "@/firebaseAdmin";

export default async function handler(req, res) {
  const { prompt, id, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provider a prompt!" });
    return;
  }

  if (!id) {
    res.status(400).json({ answer: "Please provider a valid ID!" });
    return;
  }

  // chat gpt query

  const response = await query(prompt, id, model);

  const message = {
    text: response || "Error: unable to find the answer",
    createdAt: admin?.firestore?.Timestamp?.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(id)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
