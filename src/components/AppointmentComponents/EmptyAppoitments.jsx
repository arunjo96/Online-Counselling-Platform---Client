

import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

const EmptyAppointments = ({ userRole, onBookAppointment }) => {
  return (
    <div className="bg-green-50 rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center justify-center">
     
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <AiOutlineCalendar className="text-5xl text-green-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <AiOutlineClockCircle className="text-white text-lg" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-3">
            No Appointments Yet
          </h1>
          <p className="text-green-700 mb-2 max-w-md">
            You don't have any appointments scheduled at the moment.
          </p>

          {userRole === "client" && (
            <p className="text-green-600 text-sm mb-6">
              Book a session with one of our qualified counsellors to get
              started.
            </p>
          )}

          {userRole === "counsellor" && (
            <div className="bg-white p-4 rounded-lg border border-green-200 mt-4 max-w-md mx-auto">
              <div className="flex items-start">
                <AiOutlineInfoCircle className="text-green-600 text-lg mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-green-700 text-sm text-left">
                  Your appointments will appear here once clients book sessions
                  with you. Make sure your availability is up to date to
                  maximize booking opportunities.
                </p>
              </div>
            </div>
          )}
        </div>

        {userRole === "client" && (
          <button
            onClick={onBookAppointment}
            className="bg-gradient-to-r from-green-600 to-green-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:shadow-md transition-all duration-300 flex items-center font-medium"
          >
            <AiOutlineCalendar className="mr-2 text-lg" />
            Book a Session Now
          </button>
        )}

        <div className="mt-8 w-full max-w-md">
          <div className="flex justify-between items-center opacity-30">
            <div className="w-20 h-1 bg-green-300 rounded"></div>
            <div className="w-4 h-4 bg-green-300 rounded-full"></div>
            <div className="w-32 h-1 bg-green-300 rounded"></div>
            <div className="w-4 h-4 bg-green-300 rounded-full"></div>
            <div className="w-16 h-1 bg-green-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyAppointments;
