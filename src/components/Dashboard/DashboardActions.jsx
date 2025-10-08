
// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { FiUsers, FiCalendar, FiMessageSquare, FiClock } from "react-icons/fi";

// // const ActionCard = ({
// //   to,
// //   onClick,
// //   icon: Icon,
// //   title,
// //   description,
// //   gradient,
// // }) => {
// //   const isLink = !!to;
// //   const CardComponent = isLink ? Link : motion.div;

// //   return (
// //     <motion.div
// //       whileHover={{ scale: 1.02, y: -4 }}
// //       whileTap={{ scale: 0.98 }}
// //       transition={{ type: "spring", stiffness: 300 }}
// //       className="h-full"
// //     >
// //       <CardComponent
// //         to={to}
// //         onClick={onClick}
// //         className={`h-full bg-gradient-to-r ${gradient} text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center text-center relative overflow-hidden group`}
// //       >
// //         <div
// //           className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
// //           style={{
// //             backgroundImage:
// //               "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
// //             backgroundSize: "20px 20px",
// //           }}
// //         />

// //         <div className="relative z-10 flex flex-col items-center cursor-pointer">
// //           <div className="mb-3 bg-white/10 p-3 rounded-full transform group-hover:scale-110 transition-transform duration-300">
// //             <Icon className="text-3xl text-white" />
// //           </div>

// //           <h3 className="font-medium text-lg mb-2">{title}</h3>
// //           <p className="text-sm text-white/80 mb-3">{description}</p>
// //         </div>
// //       </CardComponent>
// //     </motion.div>
// //   );
// // };

// // const DashboardActions = ({ role, onOpenAvailabilityModal }) => {
// //   const clientActions = [
// //     {
// //       to: "/counsellors",
// //       icon: FiUsers,
// //       title: "Find Counsellors",
// //       description: "Browse our network of professional counsellors",
// //       gradient: "from-green-600 to-green-500",
// //     },
// //     {
// //       to: "/appointments",
// //       icon: FiCalendar,
// //       title: "My Appointments",
// //       description: "View and manage your therapy sessions",
// //       gradient: "from-blue-600 to-blue-500",
// //     },
// //     {
// //       to: "/chat",
// //       icon: FiMessageSquare,
// //       title: "My Messages",
// //       description: "Chat with your counsellor",
// //       gradient: "from-amber-500 to-amber-400",
// //     },
// //   ];

// //   const counsellorActions = [
// //     {
// //       to: "/appointments",
// //       icon: FiCalendar,
// //       title: "Manage Appointments",
// //       description: "View and manage all your client sessions",
// //       gradient: "from-blue-600 to-blue-500",
// //     },
// //     {
// //       to: "/chat",
// //       icon: FiMessageSquare,
// //       title: "Client Messages",
// //       description: "Chat with your clients",
// //       gradient: "from-amber-500 to-amber-400",
// //     },
// //     {
// //       onClick: onOpenAvailabilityModal,
// //       icon: FiClock,
// //       title: "Update Availability",
// //       description: "Set your availability for client bookings",
// //       gradient: "from-purple-600 to-purple-500",
// //     },
// //   ];

// //   const actions = role === "client" ? clientActions : counsellorActions;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //     >
// //       <h2 className="text-xl font-semibold mb-5 text-green-800 flex items-center">
// //         <FiCalendar className="mr-2 text-green-600" />
// //         <span>Quick Actions</span>
// //       </h2>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
// //         {actions.map((action, index) => (
// //           <motion.div
// //             key={action.title}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 * (index + 1) }}
// //             className="h-full"
// //           >
// //             <ActionCard {...action} />
// //           </motion.div>
// //         ))}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default DashboardActions;


// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiUsers, FiCalendar, FiMessageSquare, FiClock } from "react-icons/fi";

// const ActionCard = ({
//   to,
//   onClick,
//   icon: Icon,
//   title,
//   description,
//   gradient,
// }) => {
//   const isLink = !!to;
//   const CardComponent = isLink ? Link : motion.div;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -4 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       className="h-full"
//     >
//       <CardComponent
//         to={to}
//         onClick={onClick}
//         className={`h-full bg-gradient-to-r ${gradient} text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center text-center relative overflow-hidden group`}
//       >
//         <div
//           className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
//           style={{
//             backgroundImage:
//               "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
//             backgroundSize: "20px 20px",
//           }}
//         />

//         <div className="relative z-10 flex flex-col items-center cursor-pointer">
//           <div className="mb-3 bg-white/10 p-3 rounded-full transform group-hover:scale-110 transition-transform duration-300">
//             <Icon className="text-3xl text-white" />
//           </div>

//           <h3 className="font-medium text-lg mb-2">{title}</h3>
//           <p className="text-sm text-white/80 mb-3">{description}</p>
//         </div>
//       </CardComponent>
//     </motion.div>
//   );
// };

// const DashboardActions = ({ role, onOpenAvailabilityModal }) => {
//   const navigate = useNavigate();

//   // Instead of using a regular Link, use this function for navigation to counsellors
//   const navigateToCounsellors = () => {
//     // The most reliable approach - force a full page refresh
//     window.location.href = "/counsellors";

//     // Alternative approach with React Router navigation
//     // navigate("/counsellors", {
//     //   state: { refresh: Date.now() },
//     //   replace: true
//     // });
//   };

//   const clientActions = [
//     {
//       // Replace "to" with onClick
//       onClick: navigateToCounsellors,
//       icon: FiUsers,
//       title: "Find Counsellors",
//       description: "Browse our network of professional counsellors",
//       gradient: "from-green-600 to-green-500",
//     },
//     {
//       to: "/appointments",
//       icon: FiCalendar,
//       title: "My Appointments",
//       description: "View and manage your therapy sessions",
//       gradient: "from-blue-600 to-blue-500",
//     },
//     {
//       to: "/chat",
//       icon: FiMessageSquare,
//       title: "My Messages",
//       description: "Chat with your counsellor",
//       gradient: "from-amber-500 to-amber-400",
//     },
//   ];

//   const counsellorActions = [
//     {
//       to: "/appointments",
//       icon: FiCalendar,
//       title: "Manage Appointments",
//       description: "View and manage all your client sessions",
//       gradient: "from-blue-600 to-blue-500",
//     },
//     {
//       to: "/chat",
//       icon: FiMessageSquare,
//       title: "Client Messages",
//       description: "Chat with your clients",
//       gradient: "from-amber-500 to-amber-400",
//     },
//     {
//       onClick: onOpenAvailabilityModal,
//       icon: FiClock,
//       title: "Update Availability",
//       description: "Set your availability for client bookings",
//       gradient: "from-purple-600 to-purple-500",
//     },
//   ];

//   const actions = role === "client" ? clientActions : counsellorActions;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-xl font-semibold mb-5 text-green-800 flex items-center">
//         <FiCalendar className="mr-2 text-green-600" />
//         <span>Quick Actions</span>
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
//         {actions.map((action, index) => (
//           <motion.div
//             key={action.title}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * (index + 1) }}
//             className="h-full"
//           >
//             <ActionCard {...action} />
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardActions;

import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiCalendar, FiMessageSquare, FiClock } from "react-icons/fi";

const ActionCard = ({
  to,
  onClick,
  icon: Icon,
  title,
  description,
  gradient,
}) => {
  const isLink = !!to;
  const CardComponent = isLink ? Link : motion.div;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <CardComponent
        to={to}
        onClick={onClick}
        className={`h-full bg-gradient-to-r ${gradient} text-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center text-center relative overflow-hidden group`}
      >
        <div
          className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center cursor-pointer">
          <div className="mb-3 bg-white/10 p-3 rounded-full transform group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-3xl text-white" />
          </div>

          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-sm text-white/80 mb-3">{description}</p>
        </div>
      </CardComponent>
    </motion.div>
  );
};

const DashboardActions = ({ role, onOpenAvailabilityModal }) => {
  const navigate = useNavigate();

  // Force a full page refresh to ensure proper loading
  const navigateToCounsellors = () => {
    window.location.href = "/counsellors";
  };

  const clientActions = [
    {
      onClick: navigateToCounsellors,
      icon: FiUsers,
      title: "Find Counsellors",
      description: "Browse our network of professional counsellors",
      gradient: "from-green-600 to-green-500",
    },
    {
      to: "/appointments",
      icon: FiCalendar,
      title: "My Appointments",
      description: "View and manage your therapy sessions",
      gradient: "from-blue-600 to-blue-500",
    },
    {
      to: "/chat",
      icon: FiMessageSquare,
      title: "My Messages",
      description: "Chat with your counsellor",
      gradient: "from-amber-500 to-amber-400",
    },
  ];

  const counsellorActions = [
    {
      to: "/appointments",
      icon: FiCalendar,
      title: "Manage Appointments",
      description: "View and manage all your client sessions",
      gradient: "from-blue-600 to-blue-500",
    },
    {
      to: "/chat",
      icon: FiMessageSquare,
      title: "Client Messages",
      description: "Chat with your clients",
      gradient: "from-amber-500 to-amber-400",
    },
    {
      onClick: onOpenAvailabilityModal,
      icon: FiClock,
      title: "Update Availability",
      description: "Set your availability for client bookings",
      gradient: "from-purple-600 to-purple-500",
    },
  ];

  const actions = role === "client" ? clientActions : counsellorActions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-5 text-green-800 flex items-center">
        <FiCalendar className="mr-2 text-green-600" />
        <span>Quick Actions</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="h-full"
          >
            <ActionCard {...action} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardActions;
