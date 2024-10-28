import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
      
      <img src="/to-do-list.png" alt="To Do List Icon" className="h-8 w-8 mr-2"  />
      </div>
      <div className="space-x-4">
        <Link to="/login" className="text-white hover:text-blue-300">
          Login
        </Link>
        <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
