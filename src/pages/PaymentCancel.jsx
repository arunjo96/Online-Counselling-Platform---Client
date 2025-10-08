import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCancelPaymentMutation } from "../features/Api/paymentApi";
import {
  selectPendingAppointmentId,
  clearPendingAppointmentId,
} from "../features/authSlice";
import {
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineWarning,
} from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");

  const pendingAppointmentId = useSelector(selectPendingAppointmentId);
  const [cancelPayment, { isLoading }] = useCancelPaymentMutation();

  useEffect(() => {
    if (pendingAppointmentId) {
      cancelPayment({ appointmentId: pendingAppointmentId })
        .unwrap()
        .then((response) => {
          setStatus("success");
          dispatch(clearPendingAppointmentId());
        })
        .catch((err) => {
          setStatus("error");
          setErrorMessage(
            err.data?.message ||
              "Failed to cancel appointment. Please contact support."
          );
          dispatch(clearPendingAppointmentId());
        });
    } else {
      setStatus("success");
    }
  }, [cancelPayment, dispatch, pendingAppointmentId]);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center border border-green-100"
      >
        {status === "processing" && (
          <>
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto flex items-center justify-center">
                <AiOutlineLoading3Quarters className="w-10 h-10 text-red-500 animate-spin" />
              </div>
              <div className="absolute -bottom-2 w-full">
                <div className="border-b border-green-100 w-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
              Cancelling Your Booking
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Please wait while we process your cancellation...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AiOutlineCloseCircle className="w-12 h-12 text-red-500" />
              </div>
              <div className="absolute -bottom-2 w-full">
                <div className="border-b border-green-100 w-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
              Payment Cancelled
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Your payment process was cancelled. The appointment slot has been
              released and is now available for others.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/counsellors")}
                className="w-full bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm"
              >
                Find Another Counsellor
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="w-full bg-green-100 cursor-pointer text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 transition-all duration-200 font-medium"
              >
                Back to Dashboard
              </motion.button>

              <p className="text-xs text-gray-500 mt-6">
                Need help?{" "}
                <a href="/contact" className="text-green-600 hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AiOutlineWarning className="w-12 h-12 text-red-500" />
              </div>
              <div className="absolute -bottom-2 w-full">
                <div className="border-b border-red-100 w-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
              Error Cancelling Payment
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              We couldn't cancel your appointment properly.
            </p>

            <p className="text-red-600 text-sm mb-6">{errorMessage}</p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/counsellors")}
                className="w-full bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm"
              >
                Find Another Counsellor
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gray-100 cursor-pointer text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Back to Dashboard
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
