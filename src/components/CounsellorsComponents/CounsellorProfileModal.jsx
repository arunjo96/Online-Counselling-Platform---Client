import {
  AiOutlineClose,
  AiOutlineDollar,
  AiOutlineIdcard,
  AiOutlineGlobal,
  AiOutlineUser,
  AiOutlineTrophy,
  AiOutlineTag,
} from "react-icons/ai";
import { motion } from "framer-motion";


const CounsellorProfileModal = ({ counsellor, onClose }) => {
  const hasProfileImage = counsellor.profile?.profileImage;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-5 flex justify-between items-center sticky top-0 z-10">
          <motion.h3
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-semibold flex items-center"
          >
            <AiOutlineUser className="mr-2" />
            Counsellor Profile
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <AiOutlineClose className="text-xl" />
          </motion.button>
        </div>

        <div
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#00b948 #f3f4f6",
          }}
        >
          <div className="p-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col md:flex-row gap-5 mb-5"
            >
              <div className="flex-shrink-0 flex justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md overflow-hidden"
                >
                  {hasProfileImage ? (
                    <img
                      src={counsellor.profile.profileImage}
                      alt={`${counsellor.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {counsellor.name
                        ? counsellor.name.charAt(0).toUpperCase()
                        : "C"}
                    </span>
                  )}
                </motion.div>
              </div>

              <div className="flex-grow">
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-lg font-semibold mb-2 text-gray-800"
                >
                  {counsellor.name}
                </motion.h4>

                {counsellor.profile ? (
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center"
                    >
                      <div className="bg-green-100 p-1.5 rounded-full mr-2 text-green-600">
                        <AiOutlineTrophy className="text-sm" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        {counsellor.profile.experienceYears} years of experience
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="flex items-center"
                    >
                      <div className="bg-green-100 p-1.5 rounded-full mr-2 text-green-600">
                        <AiOutlineDollar className="text-sm" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        ₹{counsellor.profile.feePerSession || 0} per session
                      </span>
                    </motion.div>

                    {counsellor.profile.specialization && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-2"
                      >
                        <div className="flex items-center mb-1">
                          <AiOutlineTag className="text-green-600 mr-1.5 text-sm" />
                          <span className="text-gray-700 font-medium text-xs">
                            Specializations
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {counsellor.profile.specialization.map(
                            (spec, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                                className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full"
                              >
                                {spec}
                              </motion.span>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 italic text-sm"
                  >
                    Profile details not available
                  </motion.p>
                )}
              </div>
            </motion.div>

            {counsellor.profile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 mt-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2 flex items-center">
                    <AiOutlineUser className="mr-2 text-green-600" />
                    About
                  </h5>
                  <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {counsellor.profile.bio || "No bio information provided."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2 flex items-center">
                    <AiOutlineIdcard className="mr-2 text-green-600" />
                    Qualifications
                  </h5>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {counsellor.profile.qualifications ||
                      "Qualification details not available."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-2 flex items-center">
                    <AiOutlineGlobal className="mr-2 text-green-600" />
                    Languages
                  </h5>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {counsellor.profile.languages?.map((lang, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.05 }}
                          className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs"
                        >
                          {lang}
                        </motion.span>
                      )) || "Not specified"}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 p-3 flex justify-end sticky bottom-0 bg-white shadow-inner">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-green-700 transition-colors cursor-pointer shadow-sm"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CounsellorProfileModal;
