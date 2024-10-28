import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { logout } from '../../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';

const DashboardHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <header className="bg-blue-500 p-4 flex justify-between items-center w-full">
            <div className="flex items-center ml-32">
                <img src="/to-do-list.png" alt="To Do List Icon" className="h-8 w-8 mr-2" />
            </div>
            <div className="space-x-4 flex items-center mr-40">
                <button 
                    onClick={handleLogout} 
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
