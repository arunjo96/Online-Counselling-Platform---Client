import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineArrowRight,
  AiOutlineTag,
  AiOutlineGlobal,
} from "react-icons/ai";

const CounsellorCard = ({ counsellor, openProfileModal, myAppointments }) => {
  const [localAvailability, setLocalAvailability] = useState([]);

  useEffect(() => {
    if (counsellor.profile?.availability) {
      const availabilityCopy = JSON.parse(
        JSON.stringify(counsellor.profile.availability)
      );

      const processedSlots = availabilityCopy.map((slot) => slot);

      setLocalAvailability(processedSlots);
    }
  }, [counsellor]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "EEE, MMM d");
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const handleBookClick = (slot) => {
    const counsellorWithSlot = {
      ...counsellor,
      slot: slot,
    };

    if (typeof openProfileModal === "function") {
      openProfileModal(counsellorWithSlot, true);
    }
  };

  const hasAvailability = localAvailability && localAvailability.length > 0;
  const hasProfileImage = counsellor.profile?.profileImage;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="p-5 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm overflow-hidden">
            {hasProfileImage ? (
              <img
                src={counsellor.profile.profileImage}
                alt={`${counsellor.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                {counsellor.name
                  ? counsellor.name.charAt(0).toUpperCase()
                  : "C"}
              </span>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {counsellor.name}
            </h3>
            {counsellor.profile && (
              <p className="text-sm text-gray-500 mt-0.5">
                {counsellor.profile.experienceYears} years experience
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {counsellor.profile ? (
          <>
            <div>
              <p className="text-sm text-gray-500 mb-1.5 font-medium flex items-center">
                <AiOutlineTag className="mr-1.5 text-green-600" />
                Specialization
              </p>
              <div className="flex flex-wrap gap-1.5">
                {counsellor.profile.specialization?.map((spec, idx) => (
                  <span
                    key={idx}
                    className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    {spec}
                  </span>
                )) || (
                  <span className="text-gray-500 text-sm">Not specified</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1.5 font-medium flex items-center">
                <span className="mr-1.5 text-green-600 text-base font-bold">
                  ₹
                </span>
                Fee per session
              </p>
              <p className="font-medium text-green-900">
                ₹{counsellor.profile.feePerSession || 0}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1.5 font-medium flex items-center">
                <AiOutlineGlobal className="mr-1.5 text-green-600" />
                Languages
              </p>
              <p className="text-sm">
                {counsellor.profile.languages?.join(", ") || "Not specified"}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">Profile not available</p>
        )}

        <button
          onClick={() => openProfileModal(counsellor)}
          className="text-green-600 text-sm font-medium hover:underline mt-1 inline-flex items-center group cursor-pointer"
        >
          View full profile
          <AiOutlineArrowRight className="ml-1 text-sm group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="p-5 bg-gray-50 border-t border-gray-300">
        <h4 className="font-medium mb-4 flex items-center text-gray-800">
          <AiOutlineCalendar className="mr-1.5 text-green-600" />
          Available Time Slots
        </h4>

        {hasAvailability ? (
          <div
            className="max-h-48 overflow-y-auto pr-1 space-y-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#00b948 #f3f4f6",
            }}
          >
            {localAvailability.map((slot, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  slot.booked
                    ? "bg-gray-100"
                    : "bg-white border border-gray-200 hover:border-green-300 transition-colors"
                }`}
              >
                <div className="flex-grow">
                  <div className="flex items-center">
                    <AiOutlineCalendar className="mr-1.5 text-green-600" />
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(slot.date)}
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <AiOutlineClockCircle className="mr-1.5 text-gray-500" />
                    <p className="text-xs text-gray-500">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                </div>

                {slot.booked ? (
                  <span className="px-3.5 py-1.5 text-sm rounded-md bg-gray-200 text-gray-600">
                    Booked
                  </span>
                ) : (
                  <button
                    onClick={() => handleBookClick(slot)}
                    className="px-3.5 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    Book
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm">No available slots</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorCard;
