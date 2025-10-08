import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiOutlineArrowRight,
  AiOutlineVideoCamera,
  AiOutlineMessage,
  AiOutlineCalendar,
  AiOutlineSafety,
  AiOutlineUser,
  AiOutlineCheck,
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.span
                className="text-xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Arunjo Care
              </motion.span>
            </Link>

            <motion.nav
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-green-600"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-green-600"
              >
                Testimonials
              </a>
              <Link
                to="/counsellors"
                className="text-gray-600 hover:text-green-600"
              >
                Find Counsellors
              </Link>
            </motion.nav>

            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium"
              >
                Sign Up
              </Link>
            </motion.div>

            <motion.div
              className="md:hidden flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium mr-4"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 font-medium"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <section
        className="relative pt-32 pb-20 min-h-[90vh] flex items-center md:pt-[100px]"
        style={{
          backgroundImage: "url(../assets/img/hero_banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-end">
            <motion.div
              className="w-full md:w-1/2 bg-white/50 p-8 md:p-12 rounded-xl shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 20 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Professional Counselling{" "}
                <span className="text-green-600">Anytime, Anywhere</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Connect with licensed counsellors through secure video sessions,
                messaging, and scheduling. Get the support you need on your
                terms.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-8 py-4 rounded-md hover:bg-green-700 font-medium text-center flex items-center justify-center w-full"
                  >
                    Get Started
                    <AiOutlineArrowRight className="ml-2" />
                  </Link>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/counsellors"
                    className="bg-white text-green-600 border border-green-600 px-8 py-4 rounded-md hover:bg-green-50 font-medium text-center w-full block"
                  >
                    Browse Counsellors
                  </Link>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-green-600 rounded-xl shadow-lg"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 sm:p-10">
              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">2000+</div>
                <div className="text-green-100">Licensed Counsellors</div>
              </motion.div>
              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-green-100">Sessions Completed</div>
              </motion.div>
              <motion.div
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-green-100">Client Satisfaction</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need for effective online
              counselling.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AiOutlineVideoCamera className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                Video Sessions
              </h3>
              <p className="text-gray-600 text-center">
                Connect face-to-face with qualified counsellors from the comfort
                of your home.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AiOutlineMessage className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                Secure Messaging
              </h3>
              <p className="text-gray-600 text-center">
                Communicate privately with your counsellor through our encrypted
                chat system.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AiOutlineCalendar className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600 text-center">
                Book appointments that fit your schedule with our easy-to-use
                calendar system.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AiOutlineSafety className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-900">
                Certified Professionals
              </h3>
              <p className="text-gray-600 text-center">
                All our counsellors are licensed, experienced, and carefully
                vetted.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to start your counselling journey.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "1",
                title: "Find Your Counsellor",
                desc: "Browse profiles of certified counsellors and filter by specialization, language, and availability.",
              },
              {
                step: "2",
                title: "Book Your Session",
                desc: "Schedule an appointment at a time that works for you and make a secure payment.",
              },
              {
                step: "3",
                title: "Start Counselling",
                desc: "Connect via video call or messaging and begin your mental health journey.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <motion.div
                  className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 pt-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people about their counselling experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Jane Doe",
                role: "Client",
                text: "Finding a counsellor who understood my needs was incredibly simple. The video sessions felt just as effective as in-person therapy.",
              },
              {
                name: "Dr. Arunjo",
                role: "Counsellor",
                text: "As a counsellor, this platform has allowed me to reach more clients and provide flexible support when they need it most.",
              },
              {
                name: "Gowthami Arun",
                role: "Client",
                text: "The secure messaging feature has been invaluable for those moments between sessions when I need guidance or reassurance.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <AiOutlineUser className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t.name}</h3>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{t.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-10 md:p-16 text-center shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ready to Start Your Mental Health Journey?
            </motion.h2>
            <motion.p
              className="text-xl text-green-100 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Join thousands who have found support and guidance through our
              platform.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/register"
                  className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-md font-medium text-center block w-full"
                >
                  Get Started Today
                </Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/counsellors"
                  className="bg-green-700 text-white border border-green-200 hover:bg-green-800 px-8 py-4 rounded-md font-medium text-center block w-full"
                >
                  Browse Counsellors
                </Link>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white text-lg font-bold mb-4">Arunjo Care</h3>
              <p className="mb-4">
                Professional online counselling services to support your mental
                health journey.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiFillFacebook className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiOutlineTwitter className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AiOutlineInstagram className="h-6 w-6" />
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/counsellors" className="hover:text-white">
                    Find Counsellors
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white">
                    How It Works
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-white text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <p className="mb-2">1234 Mental Health Blvd</p>
              <p className="mb-2">Wellness City, MP 90210</p>
              <p className="mb-2">contact@ArunjoCare.com</p>
              <p>+91 98765 43210</p>
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-700 pt-8 mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p>2023 Arunjo Care. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
