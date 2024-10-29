import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import SignupPage from "../../Pages/User/SignupPage";
import OtpPage from "../../Pages/User/OtpPage";
import LoginPage from "../../Pages/User/LoginPage";
import DashboardPage from "../../Pages/User/DashboardPage";


const UserRoutes = () => {
    return (
        <>
        <Routes>
           <Route path="/" element={<SignupPage />} />
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/otp" element={<OtpPage /> } />
           <Route path="/login" element={ <LoginPage />} />
           <Route path="/dashboard" element={<DashboardPage /> } />
        </Routes>
        </>
    )
}

export default UserRoutes;