import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserList from './components/User/UserList';
import UserForm from './components/User/UserForm';
import AppointmentList from './components/Appointment/AppointmentList';
import AppointmentForm from './components/Appointment/AppointmentForm';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header token={token} setToken={setToken} />
        <main className="flex-grow container mx-auto py-6">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/" element={<UserList token={token} />} />
            <Route path="/users/:id" element={<UserForm token={token} />} />
            <Route path="/appointments" element={<AppointmentList token={token} />} />
            <Route path="/appointments/new" element={<AppointmentForm token={token} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
