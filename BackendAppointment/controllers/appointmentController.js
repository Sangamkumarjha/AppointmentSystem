import db from '../config/db.config.js';

export const createAppointment = (req, res) => {
  const { studentName, teacherName, appointmentDate } = req.body;
  const sql = 'INSERT INTO appointments (studentName, teacherName, appointmentDate, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [studentName, teacherName, appointmentDate, 'Pending'], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create appointment', details: err.message });
    res.status(201).json({ message: 'Appointment created successfully', appointmentId: result.insertId });
  });
};

export const getAppointments = (req, res) => {
  const sql = 'SELECT * FROM appointments';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch appointments' });
    res.status(200).json(results);
  });
};

export const updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update appointment status' });
    res.status(200).json({ message: 'Appointment status updated successfully' });
  });
};

export const deleteAppointment = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM appointments WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete appointment' });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
};