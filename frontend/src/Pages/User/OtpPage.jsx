import React from "react";
import Otp from "../../Components/User/Otp"
import Header from "../../Layout/UserLayout/Header";

const OtpPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
            <Header />
            <Otp />
        </div>
        </>
    )
}

export default OtpPage