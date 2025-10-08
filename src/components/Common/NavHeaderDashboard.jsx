import { Link, useLocation } from "react-router-dom";
import { AiOutlineTeam, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigation } from "../../context/Navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavHeaderDashboard = ({ title }) => {
  const location = useLocation();
  const { navLinks } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-4 sm:px-6 fixed top-0 left-0 right-0 z-20 transition-shadow ${
        scrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <AiOutlineTeam className="mr-2" />
            {title}
          </h1>
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <AiOutlineClose className="text-xl" />
            ) : (
              <AiOutlineMenu className="text-xl" />
            )}
          </button>
        </div>

        <div className="hidden md:flex overflow-x-auto pb-2 mt-1 scrollbar-hide">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-2 mr-3 rounded-full whitespace-nowrap transition-colors ${
                location.pathname === link.path
                  ? "bg-white text-green-700 font-medium shadow-sm"
                  : "bg-green-600/20 text-white hover:bg-green-600/40"
              }`}
            >
              <span className="mr-1.5">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-white rounded-lg mt-2 shadow-lg overflow-hidden">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-4 py-3 transition-colors ${
                      location.pathname === link.path
                        ? "bg-green-50 text-green-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    } ${
                      index !== navLinks.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <span className="mr-3 text-lg">{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavHeaderDashboard;
