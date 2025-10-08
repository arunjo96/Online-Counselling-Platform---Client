import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllProfilesQuery, useUpsertProfileMutation, } from "../features/Api/counsellorApi";
import ProfileHeader from "../components/Dashboard/ProfileHeader";
import Toast from "../components/Dashboard/Toast";
import ProfileCard from "../components/Dashboard/ProfileCard";
import DashboardActions from "../components/Dashboard/DashboardActions";
import ProfileFormModal from "../components/ProfileFormModal";
import AvailabilityModal from "../components/Dashboard/AvailabilityModal";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [counsellorProfile, setCounsellorProfile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState(null);

  const {
    data: allProfiles,
    isLoading: profilesLoading,
    refetch,
  } = useGetAllProfilesQuery(undefined, {
    skip: user?.role !== "counsellor",
  });

  const [upsertProfile] = useUpsertProfileMutation();

  useEffect(() => {
    if (user?.role === "counsellor" && allProfiles?.profiles) {
      const profile = allProfiles.profiles.find((p) => p._id === user._id);
      if (profile) {
        setCounsellorProfile(profile.profile);
      }
    }
  }, [user, allProfiles]);

  const counsellorData = counsellorProfile
    ? { profile: counsellorProfile }
    : null;

  const isLoading = user?.role === "counsellor" ? profilesLoading : false;

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleLogout = () => {
    dispatch(clearState());
    navigate("/login");
  };

  const handleModalClose = (shouldRefetch = false) => {
    setShowModal(false);
    setShowAvailabilityModal(false);
    if (shouldRefetch && user?.role === "counsellor") {
      refetch();
    }
  };

  const handleImageUpload = async (file) => {
    if (!file || user.role !== "counsellor") return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification("error", "Image must be less than 5MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      showNotification("error", "Please select a JPEG or PNG image");
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();

      if (counsellorData?.profile) {
        if (counsellorData.profile.qualifications)
          formData.append(
            "qualifications",
            counsellorData.profile.qualifications
          );
        if (counsellorData.profile.licenseId)
          formData.append("licenseId", counsellorData.profile.licenseId);
        if (counsellorData.profile.experienceYears)
          formData.append(
            "experienceYears",
            counsellorData.profile.experienceYears
          );
        if (counsellorData.profile.feePerSession)
          formData.append(
            "feePerSession",
            counsellorData.profile.feePerSession
          );
        if (counsellorData.profile.bio)
          formData.append("bio", counsellorData.profile.bio);

        if (counsellorData.profile.specialization) {
          for (let spec of counsellorData.profile.specialization) {
            formData.append("specialization", spec);
          }
        }

        if (counsellorData.profile.languages) {
          for (let lang of counsellorData.profile.languages) {
            formData.append("languages", lang);
          }
        }

        if (counsellorData.profile.availability) {
          formData.append(
            "availability",
            JSON.stringify(counsellorData.profile.availability)
          );
        }
      }

      formData.append("profileImage", file);

      const response = await upsertProfile(formData).unwrap();

      if (response.status === "Success") {
        refetch();
        showNotification("success", "Profile image updated successfully!");
      }
    } catch (error) {
      let errorMsg = "Failed to upload image. Please try again.";
      if (error.data && error.data.message) {
        errorMsg = error.data.message;
      }
      showNotification("error", errorMsg);
    } finally {
      setUploadingImage(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-green-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-green-100 rounded-md"></div>
          <p className="text-green-600 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {notification && (
        <Toast
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}

      <ProfileHeader userName={user.name} onLogout={handleLogout} />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        <ProfileCard
          isLoading={isLoading}
          user={user}
          counsellorData={counsellorData}
          uploadingImage={uploadingImage}
          handleImageUpload={handleImageUpload}
          onEditClick={() => setShowModal(true)}
        />

        <DashboardActions
          role={user.role}
          onOpenAvailabilityModal={() => setShowAvailabilityModal(true)}
        />
      </div>

      {showModal && (
        <ProfileFormModal
          existingData={
            user.role === "counsellor" ? counsellorData?.profile : user
          }
          onClose={handleModalClose}
          userRole={user.role}
        />
      )}

      {showAvailabilityModal && user.role === "counsellor" && (
        <AvailabilityModal
          existingData={counsellorData?.profile}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
