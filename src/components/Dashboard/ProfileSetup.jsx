

import {
  FiCamera,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiAward,
  FiClock,
  FiBook,
  FiGlobe,
} from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import FileInput from "./FileInput";

export const ProfileImage = ({
  image,
  name,
  role,
  isEditable,
  isUploading,
  onImageSelect,
}) => {
  return (
    <div className="flex flex-col items-center">
      {isEditable ? (
        <FileInput
          accept="image/jpeg, image/png, image/jpg"
          onFileSelect={onImageSelect}
        >
          <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white shadow-md border-4 border-white cursor-pointer group">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              {isUploading ? (
                <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <div className="flex flex-col items-center text-white">
                  <FiCamera className="text-xl mb-1" />
                  <span className="text-xs font-medium">Change Photo</span>
                </div>
              )}
            </div>
          </div>
        </FileInput>
      ) : (
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-white shadow-md border-4 border-white">
          <span className="text-4xl font-bold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
      )}
      <div className="mt-4 text-center">
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
          {role || "User"}
        </span>
      </div>
    </div>
  );
};

export const ProfileDetail = ({ user, counsellorProfile }) => {
  return (
    <div className="flex-grow w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-green-50/50 p-5 rounded-lg border border-green-100">
        <div className="flex items-start space-x-3">
          <FiUser className="text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-medium">Name</p>
            <p className="font-medium text-gray-700">
              {user.name || "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <FiMail className="text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-medium">Email</p>
            <p className="font-medium text-gray-700 break-all">
              {user.email || "Not specified"}
            </p>
          </div>
        </div>

        {user.role === "client" && user.phoneNumber && (
          <div className="flex items-start space-x-3">
            <FiPhone className="text-green-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-green-800 text-sm font-medium">Phone Number</p>
              <p className="font-medium text-gray-700">{user.phoneNumber}</p>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-3">
          <FiUser className="text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-green-800 text-sm font-medium">Gender</p>
            <p className="font-medium text-gray-700 capitalize">
              {user.gender || "Not specified"}
            </p>
          </div>
        </div>

        {user.role === "client" && user.address && (
          <div className="flex items-start space-x-3 md:col-span-2">
            <FiMapPin className="text-green-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-green-800 text-sm font-medium">Address</p>
              <p className="text-gray-700">{user.address}</p>
            </div>
          </div>
        )}

        {user.role === "counsellor" && counsellorProfile && (
          <>
            <div className="md:col-span-2 border-t border-green-100 pt-4 mt-2"></div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <FiFileText className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">Bio</p>
                <p className="text-gray-700">
                  {counsellorProfile.bio || "No bio provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiAward className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">
                  Qualifications
                </p>
                <p className="text-gray-700">
                  {counsellorProfile.qualifications || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiFileText className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">License ID</p>
                <p className="text-gray-700">
                  {counsellorProfile.licenseId || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiClock className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">Experience</p>
                <p className="text-gray-700">
                  {counsellorProfile.experienceYears || 0} years
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <BiRupee className="text-green-600  mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">
                  Fee Per Session
                </p>
                <p className="text-gray-700">
                  {counsellorProfile.feePerSession || 0}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <FiBook className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">
                  Specialization
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counsellorProfile.specialization?.map((spec) => (
                    <span
                      key={spec}
                      className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs"
                    >
                      {spec}
                    </span>
                  )) || (
                    <span className="text-gray-500 text-sm">Not specified</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <FiGlobe className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-green-800 text-sm font-medium">Languages</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counsellorProfile.languages?.map((lang) => (
                    <span
                      key={lang}
                      className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs"
                    >
                      {lang}
                    </span>
                  )) || (
                    <span className="text-gray-500 text-sm">Not specified</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};




