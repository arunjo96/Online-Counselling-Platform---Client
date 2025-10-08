
import { createContext, useContext, useReducer, useState, useRef } from "react";

const ChatContext = createContext();

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ),
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m._id === action.payload.tempId ? action.payload.message : m
        ),
      };
    case "REMOVE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((m) => m._id !== action.payload),
      };
    case "SET_CONVERSATIONS":
      return { ...state, conversations: action.payload };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, {
    selectedUser: null,
    messages: [],
    conversations: [],
  });
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const lastMessageTimeRef = useRef(Date.now());
  const isMountedRef = useRef(true);

 
  const groupedMessages = state.messages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <ChatContext.Provider
      value={{
        ...state,
        dispatch,
        socketStatus,
        setSocketStatus,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        lastMessageTimeRef,
        isMountedRef,
        groupedMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
