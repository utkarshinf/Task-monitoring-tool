import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ResetPassword from "../Components/auth/ResetPassword";
import VerifyOtp from "../Components/auth/VerifyOtp";
import ChangePassword from "../Components/auth/ChangePassword";
import Dashboard from "../Pages/Dashboard";
import SOPMaster from "../Pages/SOPMaster";
import Login from "../Components/auth/Login";
import Management from "../Pages/Management";
import PrivateRoute from "./PrivateRoutes";
import Report from "../Pages/Report";
import { useSelector } from "react-redux";

const Routing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/sop-master" /> : <Login />
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/sop-master"
            element={
              <PrivateRoute>
                <SOPMaster />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/management"
            element={
              <PrivateRoute>
                <Management />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
