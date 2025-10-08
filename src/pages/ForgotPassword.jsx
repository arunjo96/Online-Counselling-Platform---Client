// import { useState } from "react";
// import { useForgotPasswordMutation } from "../features/Api/authApi";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     try {
//       await forgotPassword({ email }).unwrap();
//       setMessage("Password reset link sent to your email");
//     } catch (err) {
//       setError(err.data?.message || "Error sending reset link");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {message && (
//           <div className="mb-4 text-green-600 text-sm text-center font-medium">
//             {message}
//           </div>
//         )}
//         {error && (
//           <div className="mb-4 text-red-600 text-sm text-center font-medium">
//             {error}
//           </div>
//         )}
//         <button
//           type="submit"
//           className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           {isLoading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { useForgotPasswordMutation } from "../features/Api/authApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlineLoading3Quarters,
  AiOutlineCheck,
  AiOutlineWarning,
  AiOutlineLock,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await forgotPassword({ email }).unwrap();
      setMessage("Password reset link sent to your email");
    } catch (err) {
      setError(
        err.data?.message ||
          "Error sending reset link. Please check your email address and try again."
      );
    }
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
            src="/vector_img.jpg"
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
              Forgot Password?
            </h2>
            <p className="text-gray-500 mt-2">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium transition-colors duration-200 ${
                  emailFocused ? "text-green-600" : "text-gray-700"
                } mb-1.5 flex items-center`}
              >
                <AiOutlineMail
                  className={`mr-1.5 ${
                    emailFocused ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Email Address
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  emailFocused
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                />
              </div>
            </div>

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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg hover:shadow-md transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
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
                <AiOutlineArrowLeft className="mr-2" />
                Back to Login
              </Link>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            If you still need help, please contact our support team.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

