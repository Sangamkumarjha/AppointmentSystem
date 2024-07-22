import React, { useEffect, useState } from 'react';
import { getAppointments, confirmAppointment } from '../utils/api';

const AppointmentList = ({ token }) => {
  const [appointments, setAppointments] = useState([]); // Initialize appointments as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments(token);
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAppointments();
  }, [token]);

  const handleConfirm = async (id) => {
    try {
      await confirmAppointment(id, token);
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? { ...appointment, confirmed: true } : appointment
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Student ID</th>
            <th className="py-2">Teacher ID</th>
            <th className="py-2">Date</th>
            <th className="py-2">Time</th>
            <th className="py-2">Confirmed</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td className="py-2">{appointment.student_id}</td>
              <td className="py-2">{appointment.teacher_id}</td>
              <td className="py-2">{appointment.date}</td>
              <td className="py-2">{appointment.time}</td>
              <td className="py-2">{appointment.confirmed ? 'Yes' : 'No'}</td>
              <td className="py-2">
                {!appointment.confirmed && (
                  <button onClick={() => handleConfirm(appointment.id)} className="bg-blue-500 px-4 py-2 rounded text-white">Confirm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
