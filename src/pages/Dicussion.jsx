import React, { useState, useEffect, useRef } from "react";
import { database } from "../firebase-config"; // Import Firebase
import { ref, push, onValue } from "firebase/database";
import Chat1 from "../components/Chat1";
import Chat2 from "../components/Chat2";

function Discussion() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const messagesRef = ref(database, "discussion/messages"); // Reference to messages

  // Fetch messages from Firebase on load
  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedMessages = Object.values(data);
        setMessages(loadedMessages);
      }
    });
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message to Firebase with a random left/right type
  const sendMessage = () => {
    if (input.trim() !== "") {
      const randomType = Math.random() < 0.5 ? "left" : "right"; // 50% chance for left or right
      push(messagesRef, { text: input, type: randomType }); // Push message to Firebase
      setInput(""); // Clear input
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-4 py-2 ">
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-20">
        {messages.map((msg, index) => (
          msg.type === "left" ? <Chat1 key={index} message={msg.text} /> : <Chat2 key={index} message={msg.text} />
        )
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Chat Input Box */}
      <div className="w-full fixed bottom-0 left-0 p-3 bg-white shadow-md flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message...Don't add any violent content or college-related topics"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Discussion;