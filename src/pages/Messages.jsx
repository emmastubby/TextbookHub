import React, { useState } from "react";

const MessagingPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "other" },
    { id: 2, text: "Hello! How's it going?", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([
    { id: 1, name: "Alice", transaction: "Selling:", status: "Sold", title: "Algorithm Analysis", edition: "10th" },
    { id: 2, name: "Bob", transaction: "Interested in:", status: "Available", title: "Algorithm Analysis", edition: "10th" },
    { id: 3, name: "Charlie", transaction: "Interested in:", status: "Available", title: "Algorithm Analysis", edition: "10th" },
  ]);
  const [activeChat, setActiveChat] = useState(chats[0]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="flex w-full h-screen bg-gray-100 pt-16">
      {/* Left Sidebar (Chat List) */}
      <div className="w-1/4 bg-white p-4 shadow-md overflow-y-auto h-full">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 cursor-pointer rounded-md ${activeChat.id === chat.id ? "bg-blue-100 font-semibold" : "hover:bg-gray-200"
                }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="relative flex-1 bg-white h-full border-l">
        {/* Chat Header */}
        <div className="flex content-center items-center pt-2 justify-between">
          <h2 className="text-lg p-4">{activeChat.name}</h2>
          <h2 className="text-lg font-semibold p-4">{activeChat.transaction} {activeChat.title} ({activeChat.edition} edition)</h2>
          <h2 className="text-lg p-4">Status: {activeChat.status}</h2>
          <button
            className="w-fit-content h-2/3 bg-green-600 text-white py-2 px-4 mr-1 rounded-lg hover:bg-green-700 transition align-self-center"
          >
            Go to Listing
          </button>
        </div>
        <hr />

        {/* Messages Area (Takes full remaining height) */}
        <div className="overflow-y-auto p-4 h-fit-content">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 max-w-xs rounded-lg ${msg.sender === "me" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300 text-black"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Field (Fixed at Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t bg-white flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
