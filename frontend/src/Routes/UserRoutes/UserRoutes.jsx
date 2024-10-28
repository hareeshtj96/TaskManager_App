import React from "react";
import { Route, Routes } from 'react-router-dom'
import SignupPage from "../../Pages/User/SignupPage";
import OtpPage from "../../Pages/User/OtpPage";


const UserRoutes = () => {
    return (
        <>
        <Routes>
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/otp" element={<OtpPage /> } />
        </Routes>
        </>
    )
}

export default UserRoutes;