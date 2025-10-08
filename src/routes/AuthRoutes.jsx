
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Counsellors from "../pages/Counsellors";
import MyAppointments from "../pages/MyAppointments";
import PaymentCancel from "../pages/PaymentCancel";
import Chat from "../pages/Chat";
import PaymentSuccess from "../pages/PaymentSuccess";
import VideoCall from "../pages/VideoCall";
import Home from "../pages/Home";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/counsellors" element={<Counsellors />} />
      <Route path="/appointments" element={<MyAppointments />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancel" element={<PaymentCancel />} />
      <Route path="/video-call" element={<VideoCall />} />
    </Routes>
  );
};

export default AuthRoutes;
