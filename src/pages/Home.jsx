import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl">Home</h1>
      <p className="text-3xl">Welcome to Online Counselling Platform</p>
      <Link
        to="/login"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Login
      </Link>
    </>
  );
};

export default Home;
