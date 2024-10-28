import React from "react";
import Dashboard from "../../Components/User/Dashboard";
import DashboardHeader from "../../Layout/UserLayout/DashboardHeader";

const DashboardPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <Dashboard />
        </div>
        </>
    )
}

export default  DashboardPage;