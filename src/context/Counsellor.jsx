import { createContext, useContext, useState } from "react";

const CounsellorContext = createContext();

export function CounsellorProvider({ children }) {
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const openProfileModal = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setTimeout(() => {
      if (!showBookingModal) {
        setSelectedCounsellor(null);
      }
    }, 300);
  };

  const openBookingModal = (counsellor) => {
    if (counsellor) {
      setSelectedCounsellor(counsellor);
    }
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setTimeout(() => {
      if (!showProfileModal) {
        setSelectedCounsellor(null);
      }
    }, 300);
  };

  return (
    <CounsellorContext.Provider
      value={{
        selectedCounsellor,
        showProfileModal,
        showBookingModal,
        openProfileModal,
        closeProfileModal,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </CounsellorContext.Provider>
  );
}

export function useCounsellor() {
  const context = useContext(CounsellorContext);
  if (!context) {
    throw new Error("useCounsellor must be used within a CounsellorProvider");
  }
  return context;
}
