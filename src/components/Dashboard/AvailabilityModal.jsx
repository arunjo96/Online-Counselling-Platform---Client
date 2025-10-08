
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpsertProfileMutation } from "../../features/Api/counsellorApi";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiPlus,
  FiTrash2,
  FiInfo,
  FiLoader,
} from "react-icons/fi";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AvailabilityModal = ({ existingData, onClose }) => {
  const dispatch = useDispatch();
  const [upsertProfile, { isLoading }] = useUpsertProfileMutation();

  const timeSlots = [
    {
      id: "9am",
      label: "9:00 AM - 10:00 AM",
      start: "9:00 AM",
      end: "10:00 AM",
    },
    {
      id: "11am",
      label: "11:00 AM - 12:00 PM",
      start: "11:00 AM",
      end: "12:00 PM",
    },
    { id: "2pm", label: "2:00 PM - 3:00 PM", start: "2:00 PM", end: "3:00 PM" },
    { id: "4pm", label: "4:00 PM - 5:00 PM", start: "4:00 PM", end: "5:00 PM" },
  ];

  const [availabilityDates, setAvailabilityDates] = useState(
    existingData?.availability?.length > 0
      ? groupAvailabilityByDate(existingData.availability)
      : [{ date: "", dayOfWeek: "", selectedSlots: [] }]
  );

  function groupAvailabilityByDate(slots) {
    const dateGroups = {};
    slots.forEach((slot) => {
      if (!dateGroups[slot.date]) {
        dateGroups[slot.date] = {
          date: slot.date,
          dayOfWeek: slot.dayOfweek,
          selectedSlots: [],
        };
      }
      const timeSlotId = getTimeSlotIdFromTime(slot.startTime);
      if (
        timeSlotId &&
        !dateGroups[slot.date].selectedSlots.includes(timeSlotId)
      ) {
        dateGroups[slot.date].selectedSlots.push(timeSlotId);
      }
    });
    return Object.values(dateGroups);
  }

  function getTimeSlotIdFromTime(timeString) {
    if (!timeString) return null;
    const matchingSlot = timeSlots.find((slot) => slot.start === timeString);
    return matchingSlot ? matchingSlot.id : null;
  }

  const addAvailabilityDate = () => {
    setAvailabilityDates([
      ...availabilityDates,
      { date: "", dayOfWeek: "", selectedSlots: [] },
    ]);
  };

  const removeAvailabilityDate = (index) => {
    const newDates = [...availabilityDates];
    newDates.splice(index, 1);
    setAvailabilityDates(newDates);
  };

  const handleDateChange = (date, index) => {
    if (!date) return;

    const formattedDate = date.toISOString().split("T")[0];
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const newDates = [...availabilityDates];
    newDates[index].date = formattedDate;
    newDates[index].dayOfWeek = dayNames[date.getDay()];
    setAvailabilityDates(newDates);
  };

  const toggleTimeSlot = (dateIndex, slotId) => {
    const newDates = [...availabilityDates];
    const date = newDates[dateIndex];
    if (date.selectedSlots.includes(slotId)) {
      date.selectedSlots = date.selectedSlots.filter((id) => id !== slotId);
    } else {
      date.selectedSlots.push(slotId);
    }
    setAvailabilityDates(newDates);
  };

  const prepareAvailabilityForApi = () => {
    const apiSlots = [];
    availabilityDates.forEach((dateEntry) => {
      if (!dateEntry.date) return;
      dateEntry.selectedSlots.forEach((slotId) => {
        const slot = timeSlots.find((s) => s.id === slotId);
        if (slot) {
          apiSlots.push({
            dayOfweek: dateEntry.dayOfWeek,
            date: dateEntry.date,
            startTime: slot.start,
            endTime: slot.end,
          });
        }
      });
    });
    return apiSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validAvailability = prepareAvailabilityForApi();
      if (validAvailability.length === 0) {
        dispatch({
          type: "alerts/showAlert",
          payload: {
            type: "error",
            message: "Please add at least one availability slot",
          },
        });
        return;
      }

      const updatedData = { ...existingData, availability: validAvailability };
      await upsertProfile(updatedData).unwrap();
      dispatch({
        type: "alerts/showAlert",
        payload: {
          type: "success",
          message: "Availability updated successfully",
        },
      });
      onClose(true);
    } catch (err) {
      dispatch({
        type: "alerts/showAlert",
        payload: {
          type: "error",
          message: err.data?.message || "Failed to update availability",
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-lg shadow-xl max-w-xl w-full m-4"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-5 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <FiCalendar className="mr-2" /> Set Your Availability
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded-r">
            <p className="text-xs text-green-700 flex items-start">
              <FiInfo className="mr-1.5 mt-0.5 flex-shrink-0" />
              Select dates and time slots when you'll be available for
              appointments.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[50vh] pr-1 "
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#00b948 #f3f4f6",
            }}
          >
            {availabilityDates.map((dateEntry, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-3 rounded-lg mb-3 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <label className=" text-xs font-medium text-gray-700 mb-1.5 flex items-center">
                    <FiCalendar className="mr-1.5 text-green-600" />
                    Select Date
                  </label>
                  <DatePicker
                    selected={dateEntry.date ? new Date(dateEntry.date) : null}
                    onChange={(date) => handleDateChange(date, idx)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Select date"
                    className="border border-gray-300 px-3 focus-visible:outline-none py-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
                    required
                  />
                  {dateEntry.dayOfWeek && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      {dateEntry.dayOfWeek}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <label className=" text-xs font-medium text-gray-700 mb-1.5 flex items-center">
                    <FiClock className="mr-1.5 text-green-600" />
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <motion.button
                        key={slot.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => toggleTimeSlot(idx, slot.id)}
                        className={`py-1.5 px-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          dateEntry.selectedSlots.includes(slot.id)
                            ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {slot.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => removeAvailabilityDate(idx)}
                    className="bg-red-50 text-red-600 px-2 py-1 text-xs font-medium rounded-lg hover:bg-red-100 border border-red-200 transition-colors flex items-center cursor-pointer"
                  >
                    <FiTrash2 className="mr-1" />
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={addAvailabilityDate}
              className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 border border-green-200 transition-colors flex items-center mx-auto mb-3 text-sm cursor-pointer"
            >
              <FiPlus className="mr-1" />
              Add Another Date
            </motion.button>
          </form>
        </div>

        <div className="border-t border-gray-200 p-3 flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => onClose(false)}
            className="bg-white text-gray-700 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm transition-colors cursor-pointer"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 text-sm transition-colors shadow-sm flex items-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-1.5" />
                Saving...
              </>
            ) : (
              "Save Availability"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AvailabilityModal;
