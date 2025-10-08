import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const EmptyChatState = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full text-gray-500">
      <div className="text-center max-w-md p-6">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AiOutlineUser className="text-green-500 text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">
          Select a conversation
        </h3>
        <p className="text-gray-500">
          Choose a conversation from the sidebar to start chatting
        </p>
        {user.role === "client" && (
          <button
            onClick={() => navigate("/counsellors")}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm transition-colors shadow-sm"
          >
            Find a Counsellor
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyChatState;
