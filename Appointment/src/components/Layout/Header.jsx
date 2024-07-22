import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Remove token from state
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointment System</h1>
        <nav>
          {token ? (
            <>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/appointments/new" className="mr-4">Appointments</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
