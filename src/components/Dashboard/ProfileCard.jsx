
import { FiUser, FiEdit2, FiArrowUp } from "react-icons/fi";
import { ProfileImage, ProfileDetail } from "./ProfileSetup";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProfileCard = ({
  isLoading,
  user,
  counsellorData,
  uploadingImage,
  handleImageUpload,
  onEditClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 flex justify-center"
      >
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-12 bg-green-50 rounded"></div>
          <div className="h-32 bg-green-50 rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden mb-8"
    >
      <motion.div
        className="bg-gradient-to-r from-green-700 to-green-500 px-6 py-4 flex justify-between items-center"
        layoutId="profile-header"
      >
        <motion.h2
          className="text-xl font-semibold text-white flex items-center"
          layoutId="profile-title"
        >
          <FiUser className="mr-2" />
        </motion.h2>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-white/20 hover:bg-white/30 cursor-pointer text-white p-1.5 rounded-md flex items-center justify-center transition-all"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowUp size={16} />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditClick}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-all cursor-pointer"
          >
            <FiEdit2 size={14} />
            <span>
              {user.role === "counsellor" && !counsellorData?.profile
                ? "Create Profile"
                : "Edit Profile"}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              className="p-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <ProfileImage
                    image={counsellorData?.profile?.profileImage}
                    role={user.role}
                    name={user.name}
                    isEditable={user.role === "counsellor"}
                    isUploading={uploadingImage}
                    onImageSelect={handleImageUpload}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="w-full"
                >
                  <ProfileDetail
                    user={user}
                    counsellorProfile={counsellorData?.profile}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfileCard;
