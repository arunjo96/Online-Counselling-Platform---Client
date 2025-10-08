
import { useState } from "react";
import { AiOutlineSend, AiOutlineLoading3Quarters } from "react-icons/ai";


const MessageInput = ({ onSendMessage, isLoading }) => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendMessage(messageText);
    setMessageText("");
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-2 bg-green-50 border-none p-3"
    >
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 py-2.5 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !messageText.trim()}
        className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-3 px-4 rounded-full flex items-center justify-center disabled:bg-green-300 transition-colors shadow-sm"
      >
        {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <AiOutlineSend />
          )}
      </button>
    </form>
    
  );
};

export default MessageInput;

