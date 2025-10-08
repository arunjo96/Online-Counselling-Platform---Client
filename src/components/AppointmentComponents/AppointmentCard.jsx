import {
  AiOutlineWechat,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineVideoCamera,
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCall } from "../../context/ContextCall.jsx";

const AppointmentCard = ({
  appointment,
  userRole,
  onStartChat,
  onStartVideoCall,
  onOpenNotes,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { startCall } = useCall();

  const otherUser =
    userRole === "client"
      ? appointment.counsellor || { name: "Unknown" }
      : appointment.client || { name: "Unknown" };

  const getDateParts = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return { dayName, dayNumber, month };
  };

  const { dayName, dayNumber, month } = getDateParts(
    appointment.appointmentDate
  );

  const getInitial = (name) => name.charAt(0).toUpperCase();

  const handleVideoCall = (userId, userName) => {
    startCall(userId, userName);
    navigate("/video-call");
    if (onStartVideoCall) {
      onStartVideoCall(userId, userName);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="p-3 bg-gradient-to-r from-green-600 to-green-500 text-white flex items-center">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2 backdrop-blur-sm">
          <span className="text-lg font-semibold text-green-600">
            {getInitial(otherUser.name)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold">Session with {otherUser.name}</h3>
          {appointment.status === "confirmed" && (
            <span className="text-xs flex items-center">
              <AiOutlineCheckCircle className="mr-1" /> Confirmed
            </span>
          )}
        </div>
      </div>

      <div className="p-3">
        <div className="flex mb-3 pb-2 border-b border-gray-100">
          <div className="flex-shrink-0 w-16 h-16 bg-green-50 rounded flex flex-col items-center justify-center mr-3 text-center">
            <span className="text-green-600 text-xs leading-tight">
              {dayName}
            </span>
            <span className="text-xl font-bold leading-tight text-green-800">
              {dayNumber}
            </span>
            <span className="text-green-600 text-xs leading-tight">
              {month}
            </span>
          </div>

          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-500">
              <AiOutlineClockCircle className="inline mr-1" />
              {appointment.startTime} - {appointment.endTime}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <div className="flex items-center">
                <AiOutlineUser className="text-green-600 text-sm" />
                <p className="ml-1 text-xs text-gray-700">{otherUser.name}</p>
              </div>

              {userRole === "counsellor" && otherUser.email && (
                <div className="flex items-center">
                  <AiOutlineMail className="text-green-600 text-sm" />
                  <p className="ml-1 text-xs text-gray-700">
                    {otherUser.email}
                  </p>
                </div>
              )}

              {appointment.fee && (
                <div className="flex items-center">
                  <BiRupee className="text-green-600 text-sm" />
                  <p className=" text-xs text-gray-700">{appointment.fee}</p>
                </div>
              )}

              {appointment.sessionType && (
                <div className="flex items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    {appointment.sessionType}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-2">
          <button
            onClick={() => onStartChat(otherUser._id, otherUser.name)}
            className="flex-1 bg-green-600 cursor-pointer text-white px-2 py-1.5 rounded flex items-center justify-center hover:bg-green-700 text-sm"
          >
            <AiOutlineWechat className="mr-1" /> Chat
          </button>

          <button
            onClick={() => handleVideoCall(otherUser._id, otherUser.name)}
            className="flex-1 bg-green-100 cursor-pointer text-green-800 px-2 py-1.5 rounded flex items-center justify-center hover:bg-green-200 text-sm"
          >
            <AiOutlineVideoCamera className="mr-1" /> Video Call
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onOpenNotes(appointment)}
            className="flex-1 bg-gray-100 cursor-pointer text-gray-700 px-2 py-1.5 rounded flex items-center justify-center hover:bg-gray-200 text-xs"
          >
            <AiOutlineFileText className="mr-1" />
            {userRole === "counsellor" ? "Manage Notes" : "View Notes"}
          </button>

          <button
            onClick={() => onDelete(appointment)}
            className="bg-red-50 text-red-600 cursor-pointer px-2 py-1.5 rounded flex items-center justify-center hover:bg-red-100 text-xs"
          >
            <AiOutlineClose className="mr-1" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
