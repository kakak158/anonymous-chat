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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data() as Message);
      setMessages(allMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    if (text.trim()) {
      // Don't send empty messages
      addMessage(text);
      setInput("");
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-5xl text-center font-extrabold p-4 border-b-2">
        Under The Bridge - A Truly Anonymous Chatroom
      </h1>

      {/* Messages container - this should scroll */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.map((m, i) => (
          <p key={i} className="text-gray-800 mb-1">
            {m.text}
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <input
          className="w-full max-w-3xl mx-auto block border rounded-full px-4 py-2 bg-white shadow text-gray-500 focus:text-black focus:outline-none"
          type="text"
          placeholder="type anonymously here..."
          onKeyDown={handleKeyPress}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Chat;
