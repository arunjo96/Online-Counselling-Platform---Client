
import { createContext, useContext } from "react";
import {
  AiOutlineTeam,
  AiOutlineDashboard,
  AiOutlineMessage,
  AiOutlineCalendar,
} from "react-icons/ai";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <AiOutlineDashboard /> },
    { name: "Counsellors", path: "/counsellors", icon: <AiOutlineTeam /> },
    {
      name: "My Appointments",
      path: "/appointments",
      icon: <AiOutlineCalendar />,
    },
    { name: "Chat", path: "/chat", icon: <AiOutlineMessage /> },
  ];

  return (
    <NavigationContext.Provider value={{ navLinks }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
