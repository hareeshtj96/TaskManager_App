import React from "react";
import Dashboard from "../../Components/User/Dashboard";
import DashboardDnd from "../../Components/User/DashboardDnd";
import DashboardHeader from "../../Layout/UserLayout/DashboardHeader";

const DashboardPage = () => {
    return (
        <>
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <DashboardDnd />
        </div>
        </>
    )
}

export default  DashboardPage;