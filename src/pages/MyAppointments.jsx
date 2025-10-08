import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetMyAppointmentsQuery,
  useDeleteAppointmentMutation,
} from "../features/Api/appointmentApi";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import NavHeaderDashboard from "../components/Common/NavHeaderDashboard";
import { AiOutlineCalendar, AiOutlineFilter } from "react-icons/ai";
import AppointmentCard from "../components/AppointmentComponents/AppointmentCard";
import SessionNotesModal from "../components/SessionNotesModal";
import DeleteAppointmentModal from "../components/AppointmentComponents/DeleteAppointmentModal";
import EmptyAppointments from "../components/AppointmentComponents/EmptyAppoitments";
import {
  LoadingSpinner,
  ErrorDisplay,
} from "../components/AppointmentComponents/Common";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 300,
    },
  },
};

const MyAppointment = () => {
  const { data, isLoading, isError, refetch } = useGetMyAppointmentsQuery();
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState("all");
  const [myAppointments, setMyAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      setMyAppointments(data.data);
    } else {
      setMyAppointments([]);
    }
  }, [data]);

  const handleStartChat = (userId, name) => {
    localStorage.setItem(
      "selectedChatUser",
      JSON.stringify({ _id: userId, name })
    );
    navigate("/chat");
  };

  const handleStartVideoCall = (userId, name) => {
    localStorage.setItem("callReceiverId", userId);
    localStorage.setItem("callReceiverName", name);
    navigate("/video-call");
  };

  const handleOpenNotes = (appointment) => {
    setSelectedAppointment(appointment);
    setShowNotesModal(true);
  };

  const handleOpenDeleteModal = (appointment) => {
    setAppointmentToDelete(appointment);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  const handleDeleteAppointment = async (id) => {
    try {
      setDeleteError(null);
      await deleteAppointment(id).unwrap();
      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      setDeleteError(err.data?.message || "Failed to cancel appointment.");
    }
  };

  const getFilteredAppointments = () => {
    if (!myAppointments || myAppointments.length === 0) return [];

    const now = new Date();

    if (activeFilter === "upcoming") {
      return myAppointments.filter(
        (appointment) => new Date(appointment.date) >= now
      );
    } else if (activeFilter === "past") {
      return myAppointments.filter(
        (appointment) => new Date(appointment.date) < now
      );
    }

    return myAppointments;
  };

  const renderContent = () => {
    const filteredAppointments = getFilteredAppointments();

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={filterVariants}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-semibold text-green-800"
          >
            {activeFilter === "all" && "All Sessions"}
            {activeFilter === "upcoming" && "Upcoming Sessions"}
            {activeFilter === "past" && "Past Sessions"}
          </motion.h2>

          <motion.div className="hidden sm:inline-flex rounded-md shadow-sm bg-white p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 text-sm cursor-pointer font-medium rounded-md transition-colors ${
                activeFilter === "all"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter("upcoming")}
              className={`px-3 py-1.5 text-sm font-medium cursor-pointer rounded-md transition-colors ${
                activeFilter === "upcoming"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              Upcoming
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter("past")}
              className={`px-3 py-1.5 text-sm font-medium cursor-pointer rounded-md transition-colors ${
                activeFilter === "past"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              Past
            </motion.button>
          </motion.div>

          <motion.div className="sm:hidden relative w-full">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between cursor-pointer bg-white rounded-md border border-gray-200 px-4 py-2 text-sm"
            >
              <span className="font-medium text-green-700">
                Filter:{" "}
                {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
              </span>
              <AiOutlineFilter className="text-green-600" />
            </motion.button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-100 z-10"
                >
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(240, 253, 244, 1)" }}
                    onClick={() => {
                      setActiveFilter("all");
                      setShowFilters(false);
                    }}
                    className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-green-50 text-green-700"
                  >
                    All Sessions
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(240, 253, 244, 1)" }}
                    onClick={() => {
                      setActiveFilter("upcoming");
                      setShowFilters(false);
                    }}
                    className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-green-50 text-green-700"
                  >
                    Upcoming Sessions
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(240, 253, 244, 1)" }}
                    onClick={() => {
                      setActiveFilter("past");
                      setShowFilters(false);
                    }}
                    className="block cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-green-50 text-green-700"
                  >
                    Past Sessions
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {filteredAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-white rounded-lg shadow-sm p-8 text-center"
          >
            <p className="text-gray-500">
              No {activeFilter !== "all" ? activeFilter : ""} appointments
              found.
            </p>
            {user.role === "client" && (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(220, 252, 231, 1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/counsellors")}
                className="mt-4 inline-flex cursor-pointer items-center bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-md text-sm font-medium"
              >
                <AiOutlineCalendar className="mr-2" /> Book New Session
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                variants={itemVariants}
                custom={index}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <AppointmentCard
                  appointment={appointment}
                  userRole={user.role}
                  onStartChat={handleStartChat}
                  onStartVideoCall={handleStartVideoCall}
                  onOpenNotes={handleOpenNotes}
                  onDelete={handleOpenDeleteModal}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-green-50 pt-[120px]">
      <NavHeaderDashboard title="My Appointments" />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ErrorDisplay message="Failed to load appointments" />
            </motion.div>
          ) : !myAppointments.length ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <EmptyAppointments
                userRole={user.role}
                onBookAppointment={() => navigate("/counsellors")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedAppointment && showNotesModal && (
          <SessionNotesModal
            appointment={selectedAppointment}
            onClose={() => setShowNotesModal(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appointmentToDelete && showDeleteModal && (
          <DeleteAppointmentModal
            appointment={appointmentToDelete}
            userRole={user.role}
            isDeleting={isDeleting}
            error={deleteError}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => handleDeleteAppointment(appointmentToDelete._id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyAppointment;
