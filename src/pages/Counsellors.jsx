import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllProfilesQuery } from "../features/Api/counsellorApi";
import { useGetMyAppointmentsQuery } from "../features/Api/appointmentApi";
import CounsellorCard from "../components/CounsellorsComponents/CounsellorCard";
import CounsellorProfileModal from "../components/CounsellorsComponents/CounsellorProfileModal";
import BookingModal from "../components/CounsellorsComponents/BookingModal";
import NavHeaderDashboard from "../components/Common/NavHeaderDashboard";
import { useCounsellor } from "../context/Counsellor";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const Counsellors = () => {
  const location = useLocation();
  const mountedRef = useRef(true);
  const [dataReady, setDataReady] = useState(false);
  const [forceRedraw, setForceRedraw] = useState(0);
  const [bookingCounsellor, setBookingCounsellor] = useState(null);

  const { data, isLoading, error, refetch } = useGetAllProfilesQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const { data: appointmentsData, refetch: refetchAppointments } =
    useGetMyAppointmentsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    specialization: "",
    language: "",
    experience: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const {
    selectedCounsellor,
    showProfileModal,
    showBookingModal,
    openProfileModal: originalOpenProfileModal,
    closeProfileModal,
    closeBookingModal,
    openBookingModal: originalOpenBookingModal,
  } = useCounsellor();

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    refetch().then(() => {
      if (mountedRef.current) {
        setDataReady(true);
        setForceRedraw((prev) => prev + 1);
      }
    });
  }, [location.state, refetch]);

  useEffect(() => {
    if (data?.profiles && data.profiles.length > 0) setDataReady(true);
  }, [data]);

  const handleBookingSuccess = () => {
    refetchAppointments();
    closeBookingModal();
    setBookingCounsellor(null);
  };

  const openProfileModal = (counsellor, isBookingIntent = false) => {
    if (isBookingIntent && counsellor.slot) {
      setBookingCounsellor(counsellor);
      originalOpenBookingModal(counsellor);
    } else {
      originalOpenProfileModal(counsellor);
    }
  };

  const filteredCounsellors = data?.profiles?.filter((counsellor) => {
    if (searchTerm) {
      const name = counsellor.name?.toLowerCase() || "";
      const specializations =
        counsellor.profile?.specialization
          ?.map((s) => s.toLowerCase())
          .join(" ") || "";
      const languages =
        counsellor.profile?.languages?.map((l) => l.toLowerCase()).join(" ") ||
        "";
      const qualifications =
        counsellor.profile?.qualifications?.toLowerCase() || "";
      const searchLower = searchTerm.toLowerCase();
      if (
        !(
          name.includes(searchLower) ||
          specializations.includes(searchLower) ||
          languages.includes(searchLower) ||
          qualifications.includes(searchLower)
        )
      )
        return false;
    }
    if (filters.specialization && counsellor.profile?.specialization) {
      if (
        !counsellor.profile.specialization.some((spec) =>
          spec.toLowerCase().includes(filters.specialization.toLowerCase())
        )
      )
        return false;
    }
    if (filters.language && counsellor.profile?.languages) {
      if (
        !counsellor.profile.languages.some((lang) =>
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      )
        return false;
    }
    if (filters.experience && counsellor.profile?.experienceYears) {
      if (!(counsellor.profile.experienceYears >= parseInt(filters.experience)))
        return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ specialization: "", language: "", experience: "" });
  };

  const allSpecializations = [
    ...new Set(
      data?.profiles?.flatMap((c) => c.profile?.specialization || []) || []
    ),
  ];
  const allLanguages = [
    ...new Set(
      data?.profiles?.flatMap((c) => c.profile?.languages || []) || []
    ),
  ];
  const hasActiveFilters =
    searchTerm ||
    filters.specialization ||
    filters.language ||
    filters.experience;

  return (
    <div className="min-h-screen bg-green-50">
      <NavHeaderDashboard title="Available Counsellors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[150px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus-visible:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Search counsellors by name, specialization, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  <FiX className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="hidden md:flex gap-3">
              <select
                value={filters.specialization}
                onChange={(e) =>
                  setFilters({ ...filters, specialization: e.target.value })
                }
                className="border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="">All Specializations</option>
                {allSpecializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>

              <select
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
                className="border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="">All Languages</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <select
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
                className="border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 focus:ring-green-500 focus:border-green-500 cursor-pointer"
              >
                <option value="">Experience (Any)</option>
                <option value="1">1+ years</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
              </select>

              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 cursor-pointer"
                >
                  <FiX className="mr-1" /> Clear
                </motion.button>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden w-full flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiSliders className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && !showFilters && (
                <span className="ml-2 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-white rounded-lg shadow-sm md:hidden space-y-3 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  <select
                    value={filters.specialization}
                    onChange={(e) =>
                      setFilters({ ...filters, specialization: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="">All Specializations</option>
                    {allSpecializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) =>
                      setFilters({ ...filters, language: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="">All Languages</option>
                    {allLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters({ ...filters, experience: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="">Experience (Any)</option>
                    <option value="1">1+ years</option>
                    <option value="3">3+ years</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 cursor-pointer"
                  >
                    <FiX className="mr-1" /> Clear Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isLoading && !error && data?.profiles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex justify-between items-center"
          >
            <p className="text-gray-600">
              {filteredCounsellors?.length || 0} counsellors available
              {hasActiveFilters && " matching your criteria"}
            </p>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 focus:outline-none cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {filters.specialization && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    {filters.specialization}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, specialization: "" })
                      }
                      className="ml-1 focus:outline-none cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {filters.language && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    {filters.language}
                    <button
                      onClick={() => setFilters({ ...filters, language: "" })}
                      className="ml-1 focus:outline-none cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
                {filters.experience && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                    {filters.experience}+ years
                    <button
                      onClick={() => setFilters({ ...filters, experience: "" })}
                      className="ml-1 focus:outline-none cursor-pointer"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-red-50 rounded-lg border border-red-200 text-red-700"
          >
            <p className="font-medium mb-2">Error loading counsellors</p>
            <p className="text-sm">
              Please try refreshing the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium cursor-pointer"
            >
              Refresh
            </button>
          </motion.div>
        ) : isLoading || !dataReady ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12"
          >
            <motion.div
              className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600">Finding counsellors for you...</p>
          </motion.div>
        ) : !filteredCounsellors?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            className="text-center p-10 bg-white rounded-lg shadow-sm"
          >
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No counsellors found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {hasActiveFilters
                ? "We couldn't find any counsellors matching your filters. Try adjusting your search criteria."
                : "There are no counsellors available at the moment. Please check back later."}
            </p>
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium cursor-pointer"
              >
                Clear All Filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`counsellor-grid-${forceRedraw}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCounsellors.map((c) => (
              <motion.div
                key={c._id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className=""
              >
                <CounsellorCard
                  counsellor={c}
                  openProfileModal={openProfileModal}
                  myAppointments={appointmentsData?.data || []}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCounsellor && showProfileModal && (
          <CounsellorProfileModal
            counsellor={selectedCounsellor}
            onClose={closeProfileModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingModal && (bookingCounsellor || selectedCounsellor) && (
          <BookingModal
            counsellor={bookingCounsellor || selectedCounsellor}
            onClose={closeBookingModal}
            onBookingSuccess={handleBookingSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Counsellors;
