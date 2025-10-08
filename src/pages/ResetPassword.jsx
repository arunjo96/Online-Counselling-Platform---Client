
import { useState } from "react";
import { useResetPasswordMutation } from "../features/Api/authApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineCheck,
  AiOutlineWarning,
  AiOutlineLoading3Quarters,
  AiOutlineLogin,
} from "react-icons/ai";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const [focused, setFocused] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ token, newPassword }).unwrap();
      setMessage("Password reset successfully! Redirecting to login...");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.data?.message ||
          "Error resetting password. The link may be expired or invalid."
      );
    }
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row"
      >
      
        <div className="md:w-1/2 relative hidden md:block">
          <img
            src="../assets/img/vector_img.jpg"
            alt="Reset your password"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AiOutlineLock className="text-3xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Reset Your Password
            </h2>
            <p className="text-gray-500 mt-2">
              Create a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start"
              >
                <AiOutlineCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{message}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start"
              >
                <AiOutlineWarning className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label
                htmlFor="newPassword"
                className={`block text-sm font-medium transition-colors duration-200 ${
                  focused.newPassword ? "text-green-600" : "text-gray-700"
                } mb-1.5 flex items-center`}
              >
                <AiOutlineLock
                  className={`mr-1.5 ${
                    focused.newPassword ? "text-green-600" : "text-gray-500"
                  }`}
                />
                New Password
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  focused.newPassword
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter new password"
                  className="w-full p-3 rounded-lg focus:outline-none pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => handleFocus("newPassword")}
                  onBlur={() => handleBlur("newPassword")}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium transition-colors duration-200 ${
                  focused.confirmPassword ? "text-green-600" : "text-gray-700"
                } mb-1.5 flex items-center`}
              >
                <AiOutlineCheck
                  className={`mr-1.5 ${
                    focused.confirmPassword ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Confirm Password
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  focused.confirmPassword
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full p-3 rounded-lg focus:outline-none pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AiOutlineWarning className="mr-1" /> Passwords don't match
                  </p>
                )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg hover:shadow-md transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                  <span>Resetting Password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </motion.button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-3 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center cursor-pointer w-full py-2.5 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-300 ease-in-out"
              >
                <AiOutlineLogin className="mr-2" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
