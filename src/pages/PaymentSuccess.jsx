import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useConfirmPaymentMutation } from "../features/Api/paymentApi";
import {
  selectPendingAppointmentId,
  clearPendingAppointmentId,
} from "../features/authSlice";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");

  const pendingAppointmentId = useSelector(selectPendingAppointmentId);
  const [confirmPayment, { isLoading }] = useConfirmPaymentMutation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found. Payment verification failed.");
      return;
    }

    confirmPayment({ sessionId })
      .unwrap()
      .then(() => {
        setStatus("success");
        dispatch(clearPendingAppointmentId());
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(
          error.data?.message ||
            "There was a problem confirming your payment. Please contact support."
        );
      });
  }, [location.search, confirmPayment, dispatch]);

  const handleRetry = () => {
    setStatus("processing");

    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found. Payment verification failed.");
      return;
    }

    confirmPayment({ sessionId })
      .unwrap()
      .then(() => {
        setStatus("success");
        dispatch(clearPendingAppointmentId());
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(
          error.data?.message ||
            "There was a problem confirming your payment. Please contact support."
        );
      });
  };

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
                <AiOutlineLoading3Quarters className="w-10 h-10 text-green-500 animate-spin" />
              </div>
              <div className="absolute -bottom-2 w-full">
                <div className="border-b border-green-100 w-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
              Confirming Your Payment
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Please wait while we confirm your payment and update your
              appointment status...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <AiOutlineCheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div className="absolute -bottom-2 w-full">
                <div className="border-b border-green-100 w-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
              Payment Successful
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Your payment has been processed successfully. Your appointment has
              been confirmed and added to your schedule.
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/appointments")}
                className="w-full bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm"
              >
                View My Appointments
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
                A confirmation email has been sent to your registered email
                address.
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
              Payment Confirmation Failed
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              We couldn't verify your payment.
            </p>

            <p className="text-red-600 text-sm mb-6">{errorMessage}</p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
                disabled={isLoading}
                className="w-full bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Trying Again..." : "Try Again"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/appointments")}
                className="w-full bg-gray-100 cursor-pointer text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                View My Appointments
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

export default PaymentSuccess;
