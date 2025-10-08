import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../features/Api/authApi";
import { setState } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineWarning,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";

const Login = () => {
  const defaultState = { email: "", password: "" };
  const [data, setData] = useState({ ...defaultState });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const res = await login(data).unwrap();
      if (res.token && res.user) {
        dispatch(setState(res));
        setData({ ...defaultState });
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (event) => {
    setData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            src="../assets/img/vector_img.jpg"
            alt="Counseling Services"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AiOutlineUser className="text-3xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg focus:outline-none"
                  value={data.email}
                  onChange={handleChange}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium transition-colors duration-200 ${
                  passwordFocused ? "text-green-600" : "text-gray-700"
                } mb-1.5 flex items-center`}
              >
                <AiOutlineLock
                  className={`mr-1.5 ${
                    passwordFocused ? "text-green-600" : "text-gray-500"
                  }`}
                />
                Password
              </label>
              <div
                className={`relative rounded-lg border-2 transition-colors duration-200 ${
                  passwordFocused
                    ? "border-green-500 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg focus:outline-none pr-10"
                  value={data.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

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
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </motion.button>

            <div className="flex justify-center">
              <Link
                to="/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="text-center mt-4 space-y-3">
            <p className="text-gray-600 text-sm">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-green-600 font-medium hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>

            {/* Home link added right after the registration prompt */}
            <Link
              to="/"
              className="flex items-center justify-center text-green-600 hover:text-green-700 transition-colors"
            >
              <AiOutlineHome className="mr-1.5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
