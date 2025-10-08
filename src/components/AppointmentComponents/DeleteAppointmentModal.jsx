import {
  AiOutlineWarning,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineLoading3Quarters,
  AiOutlineClose,
} from "react-icons/ai";
import { appointmentFormatDate } from "../../utils/Helpers";
import { motion, AnimatePresence } from "framer-motion";

const DeleteAppointmentModal = ({
  appointment,
  userRole,
  isDeleting,
  error,
  onCancel,
  onConfirm,
}) => {
  const otherUser =
    userRole === "client"
      ? appointment.counsellor || { name: "Unknown" }
      : appointment.client || { name: "Unknown" };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden border border-gray-200"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="p-4 bg-rose-50 flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                className="bg-rose-100 rounded-full p-2 mr-3"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AiOutlineWarning className="text-xl text-rose-500" />
              </motion.div>
              <motion.h3
                className="text-lg font-medium text-gray-800"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Cancel Appointment
              </motion.h3>
            </div>
            <motion.button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineClose />
            </motion.button>
          </div>

          <div className="p-6">
            <motion.p
              className="text-gray-700 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Are you sure you want to cancel your appointment with{" "}
              <span className="font-medium text-gray-900">
                {otherUser.name}
              </span>
              ?
            </motion.p>

            <motion.div
              className="bg-green-50 p-4 rounded-lg mb-5 border border-green-100"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start mb-3">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <AiOutlineUser className="text-green-600 mt-0.5 mr-3" />
                </motion.div>
                <div>
                  <p className="text-xs text-green-700 uppercase tracking-wider font-medium">
                    Appointment with
                  </p>
                  <p className="font-medium text-gray-800">{otherUser.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <AiOutlineCalendar className="text-green-600 mt-0.5 mr-3" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-green-700 uppercase tracking-wider font-medium">
                      Date
                    </p>
                    <p className="text-gray-800">
                      {appointmentFormatDate(appointment.appointmentDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <AiOutlineClockCircle className="text-green-600 mt-0.5 mr-3" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-green-700 uppercase tracking-wider font-medium">
                      Time
                    </p>
                    <p className="text-gray-800">
                      {appointment.startTime} - {appointment.endTime}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-md text-sm mb-4 flex items-center"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                >
                  <AiOutlineWarning className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex justify-end gap-3 mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={onCancel}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Keep Appointment
              </motion.button>
              <motion.button
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 transition-colors disabled:opacity-50 cursor-pointer flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDeleting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Cancelling...
                  </>
                ) : (
                  "Cancel Appointment"
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteAppointmentModal;
