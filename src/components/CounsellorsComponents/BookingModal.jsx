import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPendingAppointmentId,
  clearPendingAppointmentId,
  selectPendingAppointmentId,
} from "../../features/authSlice";
import { useBookAppointmentMutation } from "../../features/Api/appointmentApi";
import { useCreateCheckoutSessionMutation } from "../../features/Api/paymentApi";
import {
  AiOutlineClose,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineWarning,
  AiOutlineLoading3Quarters,
  AiOutlineSafety,
  AiOutlineCheckCircle,
  AiOutlineTag,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";


const BookingModal = ({ counsellor, onClose, onBookingSuccess }) => {
  const dispatch = useDispatch();
  const [sessionType, setSessionType] = useState("Mental Health");
  const [error, setError] = useState(null);
  const pendingAppointmentId = useSelector(selectPendingAppointmentId);

  const [bookAppointment, { isLoading: bookingLoading }] =
    useBookAppointmentMutation();
  const [createCheckoutSession, { isLoading: paymentLoading }] =
    useCreateCheckoutSessionMutation();

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!counsellor || !counsellor.slot) {
        throw new Error("Invalid booking information");
      }

      const payload = {
        counsellorId: counsellor._id,
        appointmentDate: counsellor.slot.date,
        startTime: counsellor.slot.startTime,
        endTime: counsellor.slot.endTime,
        sessionType,
        fee: counsellor.profile?.feePerSession || 0,
      };

      const result = await bookAppointment(payload).unwrap();

      const appointmentId = result.appt?._id;
      if (!appointmentId) {
        throw new Error("Could not get appointment ID from response");
      }

      dispatch(setPendingAppointmentId(appointmentId));

      if (onBookingSuccess) onBookingSuccess();

      const paymentResult = await createCheckoutSession({
        appointmentId,
        amount: Number(payload.fee),
      }).unwrap();

      if (paymentResult?.url) {
        window.location.href = paymentResult.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      let errorMessage;
      if (err.data?.message) {
        errorMessage = err.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else {
        errorMessage = "An error occurred during booking";
      }

      setError(errorMessage);
      dispatch(clearPendingAppointmentId());
    }
  };

  if (!counsellor || !counsellor.slot) {
    return null;
  }

 const formatDate = (dateString) => {
   const date = parseISO(dateString);
   return format(date, "EEEE, MMMM d, yyyy");
 };


  const isLoading = bookingLoading || paymentLoading || !!pendingAppointmentId;

  const hasProfileImage = counsellor.profile?.profileImage;


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center">
              <AiOutlineCalendar className="mr-2" />
              Book Your Session
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <AiOutlineClose className="text-xl" />
            </motion.button>
          </div>
          <p className="text-green-100 text-sm mt-1">with {counsellor.name}</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center mb-4 bg-green-50 p-3 rounded-lg border border-green-100"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                {hasProfileImage ? (
                  <img
                    src={counsellor.profile.profileImage}
                    alt={`${counsellor.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-200 flex items-center justify-center text-green-700 font-medium text-xl">
                    {counsellor.name
                      ? counsellor.name.charAt(0).toUpperCase()
                      : "C"}
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-800">{counsellor.name}</h4>
                {counsellor.profile?.qualifications && (
                  <p className="text-sm text-gray-600">
                    {counsellor.profile.qualifications}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <label className="mb-2 text-sm font-medium text-gray-700 flex items-center">
                <AiOutlineTag className="mr-1.5 text-green-600" />
                Session Type
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full border cursor-pointer focus-visible:outline-none border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800"
              >
                <option value="Mental Health">Mental Health</option>
                <option value="Relationship">Relationship</option>
                <option value="Career">Career</option>
                <option value="Academic / Educational">
                  Academic / Educational
                </option>
                <option value="Addiction">Addiction</option>
                <option value="Stress Management">Stress Management</option>
                <option value="Grief & Bereavement">Grief & Bereavement</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-green-50 p-4 rounded-lg border border-green-100 space-y-3"
            >
              <h4 className="font-medium text-green-800 flex items-center">
                <AiOutlineCheckCircle className="mr-1.5" /> Appointment Details
              </h4>

              <div className="flex items-center text-gray-700">
                <AiOutlineCalendar className="text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-700">Date</p>
                  <p className="font-medium">
                    {formatDate(counsellor.slot.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <AiOutlineClockCircle className="text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-700">Time</p>
                  <p className="font-medium">
                    {counsellor.slot.startTime} - {counsellor.slot.endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2 font-medium flex-shrink-0">
                  ₹
                </span>
                <div>
                  <p className="text-xs text-green-700">Session Fee</p>
                  <p className="font-medium">
                    {counsellor.profile?.feePerSession || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
              >
                <AiOutlineWarning className="text-red-500 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-2.5 rounded-lg text-white font-medium transition-all cursor-pointer ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:shadow-md"
                }`}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>Confirm & Pay</>
                )}
              </motion.button>

              <div className="mt-4 flex items-start text-xs text-gray-500">
                <AiOutlineSafety className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  You'll be redirected to our secure payment page. Your payment
                  information is encrypted and protected.
                </p>
              </div>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
