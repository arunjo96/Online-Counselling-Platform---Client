
import { FiUser, FiLogOut } from "react-icons/fi";

const ProfileHeader = ({ userName, onLogout }) => {
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-5 sm:px-6 max-w-6xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-2 mr-4">
              <FiUser className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold">
              Welcome, {userName || "User"}
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
