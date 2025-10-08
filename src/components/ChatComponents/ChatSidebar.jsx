import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineWechat,
  AiOutlineLoading3Quarters,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  formatDate,
  formatTime,
  getInitials,
  getStatusColor,
  isToday,
} from "../../utils/Helpers";

const ChatSidebar = ({
  user,
  conversations,
  selectedUser,
  socketStatus,
  isLoading,
  mobileSidebarOpen,
  onSelectUser,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        mobileSidebarOpen ? "block w-full" : "hidden"
      } lg:block lg:w-80 bg-white border-r border-gray-200 z-10 flex flex-col shadow-sm`}
    >
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                socketStatus === "connected" ? "bg-green-300" : "bg-yellow-300"
              }`}
            ></span>
            <span className="text-xs font-medium text-green-50">
              {user.role === "counsellor" ? "Counsellor" : "Client"}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <Link
            to="/dashboard"
            className="text-green-100 text-sm hover:text-white flex items-center gap-1"
          >
            <AiOutlineDashboard /> Dashboard
          </Link>
          {socketStatus === "connected" && (
            <div className="ml-auto flex items-center text-xs text-green-100">
              Live updates active
            </div>
          )}
        </div>
      </div>

      <div className="overflow-y-auto flex-grow">
        {isLoading && conversations.length === 0 ? (
          <div className="flex justify-center items-center h-20">
            <AiOutlineLoading3Quarters className="text-green-500 animate-spin" />
          </div>
        ) : conversations.length === 0 ? (
          <EmptyConversationState user={user} navigate={navigate} />
        ) : (
          <ConversationList
            conversations={conversations}
            selectedUser={selectedUser}
            user={user}
            onSelectUser={onSelectUser}
          />
        )}
      </div>
    </div>
  );
};

const EmptyConversationState = ({ user, navigate }) => (
  <div className="text-center p-8 bg-white">
    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
      <AiOutlineWechat className="text-green-500 text-2xl" />
    </div>
    <p className="text-gray-800 font-medium">No conversations yet</p>
    <p className="text-gray-500 text-sm mt-1">
      {user.role === "client"
        ? "Book a session with a counsellor to start chatting"
        : "Waiting for clients to book sessions with you"}
    </p>

    {user.role === "client" && (
      <button
        onClick={() => navigate("/counsellors")}
        className="mt-4 bg-green-500 text-white px-4 py-2  rounded-full text-sm hover:bg-green-600 transition-colors shadow-sm"
      >
        Find Counsellors
      </button>
    )}
  </div>
);

const ConversationList = ({
  conversations,
  selectedUser,
  user,
  onSelectUser,
}) => (
  <>
    {user.role === "counsellor" && (
      <div className="px-4 py-2 bg-green-50 text-green-800 border-b border-green-100">
        <div className="flex items-center">
          <AiOutlineUser className="mr-1" />
          <p className="text-xs font-medium">
            {conversations.length} client
            {conversations.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>
    )}

    {conversations.map((chatUser) => (
      <ConversationItem
        key={chatUser._id}
        chatUser={chatUser}
        isSelected={selectedUser?._id === chatUser._id}
        currentUser={user}
        onSelect={() => onSelectUser(chatUser)}
      />
    ))}
  </>
);

const ConversationItem = ({ chatUser, isSelected, currentUser, onSelect }) => (
  <div
    className={`flex items-center p-3 border-b cursor-pointer border-gray-200  hover:bg-green-50 transition-colors ${
      isSelected ? "bg-green-50 border-l-4 border-l-green-500" : ""
    }`}
    onClick={onSelect}
  >
    <div className="w-12 h-12 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-medium mr-3">
      {getInitials(chatUser.name)}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-800">{chatUser.name}</h3>
        {chatUser.lastMessageTime && (
          <span className="text-xs text-gray-500">
            {isToday(chatUser.lastMessageTime)
              ? formatTime(chatUser.lastMessageTime)
              : formatDate(chatUser.lastMessageTime)}
          </span>
        )}
      </div>
      {chatUser.lastAppointment && (
        <div className="flex items-center text-xs mt-0.5">
          <AiOutlineCalendar className="text-gray-400 mr-1" />
          <span className="text-gray-600 mr-1">
            {formatDate(chatUser.lastAppointment.date)}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-xs ${getStatusColor(
              chatUser.lastAppointment.status
            )}`}
          >
            {chatUser.lastAppointment.status}
          </span>
        </div>
      )}
      {chatUser.lastMessage && (
        <p className="text-xs text-gray-500 truncate mt-1">
          {currentUser._id === chatUser.lastMessageSender && (
            <span className="text-gray-400 mr-1">You:</span>
          )}
          {chatUser.lastMessage.substr(0, 28)}
          {chatUser.lastMessage.length > 28 ? "..." : ""}
        </p>
      )}
    </div>
  </div>
);

export default ChatSidebar;
