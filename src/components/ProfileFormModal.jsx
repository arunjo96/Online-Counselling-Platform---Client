import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/authSlice";
import { useUpsertProfileMutation } from "../features/Api/counsellorApi";
import {
  AiOutlineLoading3Quarters,
  AiOutlineClose,
  AiOutlineIdcard,
  AiOutlinePhone,
  AiOutlineDollar,
  AiOutlineGlobal,
  AiOutlineTrophy,
  AiOutlineTag,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";

const ProfileFormModal = ({ existingData, onClose, userRole }) => {
  const dispatch = useDispatch();
  const [upsertProfile, { isLoading }] = useUpsertProfileMutation();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initializeCounsellorFormData = () => {
    return {
      qualifications: existingData?.qualifications || "",
      licenseId: existingData?.licenseId || "",
      experienceYears: existingData?.experienceYears?.toString() || "",
      specialization: Array.isArray(existingData?.specialization)
        ? existingData.specialization
        : [],
      languages: Array.isArray(existingData?.languages)
        ? existingData.languages
        : [],
      feePerSession: existingData?.feePerSession?.toString() || "",
      bio: existingData?.bio || "",
    };
  };

  const initializeClientFormData = () => {
    return {
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      preferredLanguages: Array.isArray(user?.preferredLanguages)
        ? user.preferredLanguages
        : [],
    };
  };

  const [formData, setFormData] = useState(
    userRole === "counsellor"
      ? initializeCounsellorFormData()
      : initializeClientFormData()
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, fieldName) => {
    const values = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData({ ...formData, [fieldName]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (userRole === "counsellor") {
        const processedData = {
          ...formData,
          experienceYears: parseInt(formData.experienceYears, 10) || 0,
          feePerSession: parseInt(formData.feePerSession, 10) || 0,
          availability: existingData?.availability || [],
        };

        const result = await upsertProfile(processedData).unwrap();

        if (result && result.profile) {
          dispatch(updateUser({ profile: result.profile }));
          setSuccess(true);
          setTimeout(() => {
            onClose(true);
          }, 1500);
        }
      } else {
        dispatch(updateUser(formData));
        setSuccess(true);
        setTimeout(() => {
          onClose(true);
        }, 1500);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(
        err.data?.message || "Failed to save profile. Please try again."
      );
    }
  };

  useEffect(() => {
    if (userRole === "counsellor") {
      setFormData(initializeCounsellorFormData());
    } else if (user && userRole === "client") {
      setFormData(initializeClientFormData());
    }
  }, [existingData, user, userRole]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-green-50 rounded-xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] flex flex-col border border-green-200"
      >
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4 sticky top-0 z-10 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <AiOutlineUser className="mr-2 text-xl" />
              {userRole === "counsellor"
                ? "Edit Counselor Profile"
                : "Edit Client Profile"}
            </h2>
            <button
              onClick={() => onClose(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <AiOutlineClose className="text-lg" />
            </button>
          </div>
        </div>

        <div
          className="overflow-y-auto flex-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#00b948 #f3f4f6",
          }}
        >
          {success ? (
            <div className="p-8 text-center bg-green-50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-200">
                <AiOutlineCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Profile Updated!
              </h3>
              <p className="text-sm text-green-700">
                Your profile has been updated successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 bg-green-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {userRole === "counsellor" ? (
                  <>
                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineTrophy className="mr-1.5 text-green-600" />
                        Qualifications
                      </label>
                      <input
                        type="text"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="e.g., MSc Clinical Psychology"
                        required
                      />
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        Your highest educational qualification
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineIdcard className="mr-1.5 text-green-600" />
                        License ID
                      </label>
                      <input
                        type="text"
                        name="licenseId"
                        value={formData.licenseId}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Your professional license ID"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineTrophy className="mr-1.5 text-green-600" />
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        min="0"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineDollar className="mr-1.5 text-green-600" />
                        Fee per Session (₹)
                      </label>
                      <input
                        type="number"
                        name="feePerSession"
                        value={formData.feePerSession}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        min="0"
                        required
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineTag className="mr-1.5 text-green-600" />
                        Specialization (comma separated)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization.join(", ")}
                          onChange={(e) =>
                            handleArrayChange(e, "specialization")
                          }
                          className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="e.g., Anxiety, Depression, PTSD"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AiOutlineInfoCircle className="text-green-400" />
                        </div>
                      </div>
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        Enter multiple specializations separated by commas
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineGlobal className="mr-1.5 text-green-600" />
                        Languages (comma separated)
                      </label>
                      <input
                        type="text"
                        name="languages"
                        value={formData.languages.join(", ")}
                        onChange={(e) => handleArrayChange(e, "languages")}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="e.g., English, Hindi, Tamil"
                        required
                      />
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        Languages you can provide therapy in
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineUser className="mr-1.5 text-green-600" />
                        Professional Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        rows="4"
                        placeholder="Tell potential clients about yourself, your approach to therapy, and your experience."
                        required
                      />
                      <div className="flex justify-between text-xs text-green-600 mt-1 pl-1">
                        <span>
                          Tell clients about your therapeutic approach
                        </span>
                        <span>{formData.bio.length} characters</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlinePhone className="mr-1.5 text-green-600" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="Your phone number"
                      />
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        We'll only contact you about your appointments
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineGlobal className="mr-1.5 text-green-600" />
                        Preferred Languages
                      </label>
                      <input
                        type="text"
                        name="preferredLanguages"
                        value={
                          Array.isArray(formData.preferredLanguages)
                            ? formData.preferredLanguages.join(", ")
                            : ""
                        }
                        onChange={(e) =>
                          handleArrayChange(e, "preferredLanguages")
                        }
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="e.g., English, Hindi, Tamil"
                      />
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        Languages you're comfortable communicating in
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="flex items-center text-sm text-green-800 font-medium">
                        <AiOutlineHome className="mr-1.5 text-green-600" />
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full text-sm py-2.5 px-3 bg-white border border-green-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                        rows="2"
                        placeholder="Your address"
                      />
                      <p className="text-xs text-green-600 mt-1 pl-1">
                        This information is kept private and secure
                      </p>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-md mb-4 text-xs">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AiOutlineExclamationCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {!success && (
          <div className="bg-green-100 p-4 border-t border-green-200 sticky bottom-0 rounded-b-xl">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 text-sm border border-green-300 rounded-lg text-green-800 font-medium hover:bg-green-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfileFormModal;
