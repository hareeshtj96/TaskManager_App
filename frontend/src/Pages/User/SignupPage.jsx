import React from "react";
import Signup from "../../Components/User/Signup";
import Header from "../../Layout/UserLayout/Header";

const SignupPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
            <Header />
            <Signup />
        </div>
        </>
    )
}

export default SignupPage