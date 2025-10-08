
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCallData } from "../../features/authSlice";
import { AiOutlineVideoCamera, AiOutlineArrowLeft } from "react-icons/ai";
import { getInitials } from "../../utils/Helpers";

const ChatHeader = ({
  user,
  selectedUser,
  socketStatus,
  onMobileBackClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { callReceiverId } = useSelector(state => state.auth);

  const initiateVideoCall = () => {
    if (!selectedUser) return;
    
    if (callReceiverId) return;

    dispatch(
      setCallData({
        receiverId: selectedUser._id,
        receiverName: selectedUser.name,
      })
    );

    setTimeout(() => navigate("/video-call"), 100);
  };

  const isOnline = socketStatus === "connected";
  const isCallInProgress = !!callReceiverId;

  return (
    <div className="bg-green-50 shadow-sm p-3 border-b flex justify-between items-center border-none">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-2 text-gray-600"
          onClick={onMobileBackClick}
          aria-label="Back"
        >
          <AiOutlineArrowLeft size={20} />
        </button>

        <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-medium mr-3">
          {getInitials(selectedUser.name)}
        </div>

        <div>
          <h3 className="font-medium text-gray-800">{selectedUser.name}</h3>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 capitalize mr-2">
              {selectedUser.role}
            </span>
            {isOnline && (
              <span className="flex items-center text-xs text-green-600">
                <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                Online
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={initiateVideoCall}
        disabled={isCallInProgress}
        className={`${
          isCallInProgress 
            ? "bg-gray-400 cursor-not-allowed opacity-70" 
            : "bg-green-500 hover:bg-green-600 cursor-pointer"
        } text-white px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors shadow-sm`}
        title={isCallInProgress ? "Call in progress" : "Start video call"}
      >
        <AiOutlineVideoCamera className="text-lg" />
        <span className="font-medium">Call</span>
      </button>
    </div>
  );
};

export default ChatHeader;
