"use client";
import React, { useEffect, useRef, useState } from "react";
import { db } from "@/firebase";
import { addMessage } from "@/firebaseTools";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

interface Message {
  text: string;
  createdAt?: unknown;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 1️⃣ Create a ref to track the last message
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(allMessages);
    });
    return () => unsubscribe();
  }, []);

  // 2️⃣ Whenever messages change, scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    addMessage(text);
    setInput("");
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 overflow-y-auto">
      <h1 className="text-5xl text-center font-extrabold pb-4 border-b-2 mb-4">
        Under The Bridge - A Truly Anonymous Chatroom
      </h1>
      {/* 3️⃣ Messages container */}
      <div className="flex-1 overflow-y-auto mb-16">
        {messages.map((m, i) => (
          <p key={i} className="text-gray-800 mb-1">
            {m.text}
          </p>
        ))}

        {/* 4️⃣ Invisible element to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* 5️⃣ Input bar */}
      <input
        className="w-[80%] absolute bottom-2 left-1/2 transform -translate-x-1/2 border rounded-full px-4 py-2 bg-white shadow text-gray-500 focus:text-black"
        type="text"
        placeholder="type anonymously here..."
        onKeyDown={handleKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Chat;
