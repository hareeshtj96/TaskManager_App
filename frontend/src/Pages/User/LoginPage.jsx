import React from "react";
import Login from "../../Components/User/Login";
import Header from "../../Layout/UserLayout/Header";

const LoginPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
            <Header />
            <Login />
        </div>
        </>
    )
}

export default  LoginPage;