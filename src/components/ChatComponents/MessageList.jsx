
import { useRef, useEffect } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineWechat,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { getInitials, formatTime, formatDate } from "../../utils/Helpers";

const MessageList = ({ user, selectedUser, groupedMessages, isLoading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupedMessages]);

  if (isLoading && Object.keys(groupedMessages).length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 flex justify-center items-center border-none">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="text-green-500 animate-spin text-2xl mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groupedMessages).length === 0) {
    return <EmptyMessageState />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 border-none">
      <div className="space-y-6">
        {Object.keys(groupedMessages).map((date) => (
          <MessageGroup
            key={date}
            date={date}
            messages={groupedMessages[date]}
            user={user}
            selectedUser={selectedUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const EmptyMessageState = () => (
  <div className="flex-1 overflow-y-auto p-4 bg-gray-100 flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
      <AiOutlineWechat className="text-green-500 text-2xl" />
    </div>
    <p className="text-gray-800 font-medium">No messages yet</p>
    <p className="text-gray-500 text-sm mt-1">
      Send a message to start the conversation
    </p>
  </div>
);

const MessageGroup = ({ date, messages, user, selectedUser }) => (
  <div className="space-y-3">
    <div className="text-center">
      <span className="inline-block bg-gray-200 text-gray-600 text-xs font-medium py-1 px-3 rounded-full">
        {formatDate(date)}
      </span>
    </div>
    {messages.map((msg, index) => {
      const isUserMessage = msg.sender === user._id;
      const showAvatar =
        index === 0 || messages[index - 1]?.sender !== msg.sender;
      return (
        <MessageBubble
          key={msg._id}
          message={msg}
          isUserMessage={isUserMessage}
          showAvatar={showAvatar}
          user={user}
          otherUser={selectedUser}
        />
      );
    })}
  </div>
);

const MessageBubble = ({
  message,
  isUserMessage,
  showAvatar,
  user,
  otherUser,
}) => (
  <div
    className={`flex ${
      isUserMessage ? "justify-end" : "justify-start"
    } items-start mb-2`}
  >
    <div
      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-2 ${
        !isUserMessage && showAvatar
          ? "bg-green-100 text-green-800"
          : "opacity-0"
      }`}
    >
      {!isUserMessage && showAvatar && getInitials(otherUser?.name || "User")}
    </div>

    <div className="max-w-[75%]">
      {showAvatar && (
        <div
          className={`text-xs font-medium mb-1 ${
            isUserMessage
              ? "text-right text-green-700"
              : "text-left text-gray-700"
          }`}
        >
          {isUserMessage ? "You" : otherUser?.name || "User"}
        </div>
      )}

      <div
        className={`p-3 rounded-2xl ${
          isUserMessage
            ? message.pending
              ? "bg-green-300 text-white"
              : "bg-green-600 text-white"
            : "bg-white text-gray-800 shadow-sm"
        } ${isUserMessage ? "rounded-tr-sm" : "rounded-tl-sm"}`}
      >
        <p className="break-words">{message.text}</p>
      </div>

      <div
        className={`flex items-center mt-1 text-xs ${
          isUserMessage ? "justify-end" : "justify-start"
        }`}
      >
        <span className="text-gray-500">{formatTime(message.createdAt)}</span>
        {isUserMessage && !message.pending && (
          <AiOutlineCheckCircle className="ml-1 text-green-500" />
        )}
        {isUserMessage && message.pending && (
          <AiOutlineClockCircle className="ml-1 text-gray-400" />
        )}
      </div>
    </div>

    <div
      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ml-2 ${
        isUserMessage && showAvatar ? "bg-green-600 text-white" : "opacity-0"
      }`}
    >
      {isUserMessage && showAvatar && getInitials(user?.name || "You")}
    </div>
  </div>
);

export default MessageList;
