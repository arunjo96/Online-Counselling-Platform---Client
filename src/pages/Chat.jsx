
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

import ChatSidebar from "../components/ChatComponents/ChatSidebar";
import ChatHeader from "../components/ChatComponents/ChatHeader";
import MessageList from "../components/ChatComponents/MessageList";
import MessageInput from "../components/ChatComponents/MessageInput";
import EmptyChatState from "../components/ChatComponents/EmptyChatState";

import { useChatContext } from "../context/ChatContext";
import { useChatMessages } from "../hooks/chatMessage";
import { useChatConversations } from "../hooks/chatConvesations";
import { useChatSocketSetup } from "../hooks/chatSocket";

const Chat = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const socketRef = useSocket(token);
  
  const { 
    selectedUser, 
    conversations, 
    socketStatus,
    mobileSidebarOpen, 
    setMobileSidebarOpen,
    groupedMessages
  } = useChatContext();

  const { 
    messagesLoading, 
    refetchMessages, 
    isSendingMessage, 
    handleSendMessage 
  } = useChatMessages(user, socketRef);

  const { 
    conversationsLoading,
    refetchConversations,
    handleSelectUser
  } = useChatConversations(user, refetchMessages);


  useChatSocketSetup(socketRef, user, refetchMessages, refetchConversations);
  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleMobileBackClick = useCallback(() => {
    setMobileSidebarOpen(true);
  }, [setMobileSidebarOpen]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar 
        user={user}
        conversations={conversations}
        selectedUser={selectedUser}
        socketStatus={socketStatus}
        isLoading={conversationsLoading}
        mobileSidebarOpen={mobileSidebarOpen}
        onSelectUser={handleSelectUser}
      />
      
      <div
        className={`${
          mobileSidebarOpen ? "hidden" : "flex"
        } lg:flex flex-1 flex-col bg-gray-50`}
      >
        {selectedUser ? (
          <>
            <ChatHeader 
              user={user}
              selectedUser={selectedUser}
              socketStatus={socketStatus}
              onMobileBackClick={handleMobileBackClick}
            />
            
            <MessageList 
              user={user}
              selectedUser={selectedUser}
              groupedMessages={groupedMessages}
              isLoading={messagesLoading}
            />
            
            <MessageInput
              onSendMessage={handleSendMessage}
              isLoading={isSendingMessage}
            />
          </>
        ) : (
          <EmptyChatState user={user} />
        )}
      </div>
    </div>
  );
};

export default Chat;
