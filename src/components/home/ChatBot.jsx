import { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you with Milkiana products?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong 😔" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
        bg-linear-to-r from-green-500 to-green-700
        shadow-lg shadow-green-500/50
        flex items-center justify-center
        text-white text-xl
        hover:scale-110 transition-transform duration-300"
      >
        💬
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80
        bg-white/95 backdrop-blur-md
        rounded-2xl shadow-2xl border
        flex flex-col
        transition-all duration-300
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-green-600 to-green-700
          text-white px-4 py-3 rounded-t-2xl
          flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <h3 className="font-semibold">Milkiana Assistant</h3>
        </div>

        {/* Messages */}
        <div className="p-4 h-64 overflow-y-auto space-y-3 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-2 rounded-xl shadow-sm
              ${
                msg.from === "bot"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-green-600 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl w-fit animate-pulse">
              Typing…
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center border-t p-3 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about milk yield, feed..."
            className="flex-1 px-3 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700
            text-white px-4 py-2 rounded-lg transition shadow"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
