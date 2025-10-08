
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineLoading3Quarters,
  AiOutlineUserSwitch,
  AiOutlineCheck,
  AiOutlineWarning,
} from "react-icons/ai";
import { BiMale, BiFemale } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../features/Api/authApi";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    role: "client",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await register(form).unwrap();
      localStorage.setItem("token", res.token);
      setError({
        type: "success",
        message: "Registration successful! Redirecting to login...",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError({
        type: "error",
        message: err.data?.message || "Registration failed. Please try again.",
      });
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
        <div className="md:w-1/2 relative">
          <img
            src="/vector_img.jpg"
            alt="Register to Counseling Services"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-none">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AiOutlineUser className="text-3xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-1">Join our counseling platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className={`text-sm font-medium mb-1.5 flex items-center ${
                  focused.name ? "text-green-600" : "text-gray-700"
                }`}
              >
                <AiOutlineUser
                  className={`mr-1.5 ${
                    focused.name ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Full Name
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  focused.name
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg focus:outline-none"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className={`text-sm font-medium mb-1.5 flex items-center ${
                  focused.email ? "text-green-600" : "text-gray-700"
                }`}
              >
                <AiOutlineMail
                  className={`mr-1.5 ${
                    focused.email ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Email Address
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  focused.email
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg focus:outline-none"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`text-sm font-medium mb-1.5 flex items-center ${
                  focused.password ? "text-green-600" : "text-gray-700"
                }`}
              >
                <AiOutlineLock
                  className={`mr-1.5 ${
                    focused.password ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Password
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  focused.password
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full p-3 rounded-lg focus:outline-none pr-10"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 text-gray-700 flex items-center">
                  <AiOutlineUserSwitch className="mr-1.5 text-gray-500" />
                  Gender
                </label>
                <div className="flex space-x-2">
                  <label
                    className={`flex-1 cursor-pointer flex items-center justify-center space-x-1 p-2.5 rounded-lg border-2 transition-all ${
                      form.gender === "male"
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === "male"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <BiMale className="text-xl" />
                    <span>Male</span>
                  </label>
                  <label
                    className={`flex-1 cursor-pointer flex items-center justify-center space-x-1 p-2.5 rounded-lg border-2 transition-all ${
                      form.gender === "female"
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === "female"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <BiFemale className="text-xl" />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 text-gray-700">
                  Register as:
                </label>
                <div className="flex space-x-2">
                  <label
                    className={`flex-1 cursor-pointer flex items-center justify-center p-2.5 rounded-lg border-2 transition-all ${
                      form.role === "client"
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={form.role === "client"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>Client</span>
                  </label>
                  <label
                    className={`flex-1 cursor-pointer flex items-center justify-center p-2.5 rounded-lg border-2 transition-all ${
                      form.role === "counsellor"
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="counsellor"
                      checked={form.role === "counsellor"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>Counsellor</span>
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg text-sm flex items-start ${
                  error.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {error.type === "success" ? (
                  <AiOutlineCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                ) : (
                  <AiOutlineWarning className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                )}
                <span>{error.message}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mb-2 cursor-pointer bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg hover:shadow-md transition-all font-medium disabled:opacity-70 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 h-5 w-5" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>

            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-3 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 font-medium hover:underline cursor-pointer"
                >
                  Log in
                </Link>
              </p>
            </div>

            <p className="text-center text-gray-500 text-xs mt-4">
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
